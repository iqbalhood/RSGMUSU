const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

// GET /api/laporan?type=summary|daily|klinik
// Summary: total pasien, kunjungan bulan ini, pendapatan bulan ini
// Daily: kunjungan per hari (7/30 hari terakhir)
// Klinik: kunjungan per klinik bulan ini
module.exports = requireAuth(async (req, res) => {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' })

    const { type = 'summary', days = '30' } = req.query || {}
    const d = parseInt(days) || 30
    const since = new Date()
    since.setDate(since.getDate() - d)

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    try {
        if (type === 'summary') {
            const [totalPasien, kunjunganBulanIni, kunjunganHariIni, kunjunganMenunggu] = await Promise.all([
                prisma.dataPasien.count(),
                prisma.tabelKunjugan.count({ where: { tanggal_kunjungan: { gte: startOfMonth } } }),
                prisma.tabelKunjugan.count({
                    where: {
                        tanggal_kunjungan: {
                            gte: new Date(new Date().setHours(0, 0, 0, 0)),
                            lt: new Date(new Date().setHours(23, 59, 59, 999)),
                        },
                    },
                }),
                prisma.tabelKunjugan.count({ where: { status: '0' } }),
            ])

            // Revenue this month (paid)
            const paidThisMonth = await prisma.tabelKunjugan.findMany({
                where: { status_pembayaran: '2', tanggal_pembayaran: { gte: startOfMonth } },
                select: { biaya_rekam_medis: true },
            })
            const pendapatanBulanIni = paidThisMonth.reduce((s, v) => s + (parseInt(v.biaya_rekam_medis) || 0), 0)

            return res.status(200).json({
                totalPasien,
                kunjunganBulanIni,
                kunjunganHariIni,
                kunjunganMenunggu,
                pendapatanBulanIni,
            })
        }

        if (type === 'daily') {
            // Group kunjungan per day for last `days` days
            const rows = await prisma.tabelKunjugan.findMany({
                where: { tanggal_kunjungan: { gte: since } },
                select: { tanggal_kunjungan: true },
                orderBy: { tanggal_kunjungan: 'asc' },
            })

            const grouped = {}
            rows.forEach(r => {
                const dt = r.tanggal_kunjungan
                if (!dt) return
                const key = new Date(dt).toISOString().split('T')[0]
                grouped[key] = (grouped[key] || 0) + 1
            })

            // Fill missing days with 0
            const result = []
            for (let i = d - 1; i >= 0; i--) {
                const dt = new Date()
                dt.setDate(dt.getDate() - i)
                const key = dt.toISOString().split('T')[0]
                result.push({ date: key, count: grouped[key] || 0 })
            }
            return res.status(200).json({ event: result })
        }

        if (type === 'klinik') {
            const KLINIK = {
                1: 'IKGP', 2: 'Periodonsia', 3: 'IPM', 4: 'IKGA', 5: 'Konservasi',
                6: 'Prostodonsia', 7: 'Bedah Mulut', 8: 'Ortodonsia', 9: 'Radiologi',
            }

            const counts = await Promise.all(
                Object.keys(KLINIK).map(async (k) => ({
                    klinik: KLINIK[k],
                    id: parseInt(k),
                    count: await prisma.tabelKunjugan.count({
                        where: { id_klinik: parseInt(k), tanggal_kunjungan: { gte: since } },
                    }),
                }))
            )
            return res.status(200).json({ event: counts.sort((a, b) => b.count - a.count) })
        }

        return res.status(400).json({ message: 'Unknown type' })
    } catch (err) {
        console.error('[laporan]', err)
        return res.status(500).json({ message: 'Server error' })
    }
})
