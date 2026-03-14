const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

module.exports = requireAuth(async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' })

    try {
        const { tawal, takhir, klinik, status } = req.query || {}

        // Build where clause
        const where = {}
        if (tawal && takhir) {
            where.tanggal_kunjungan = {
                gte: new Date(tawal + 'T00:00:00.000Z'),
                lte: new Date(takhir + 'T23:59:59.999Z'),
            }
        }
        if (klinik) where.id_klinik = parseInt(klinik)
        if (status) where.status = status

        // Fetch data including related patient and doctor details
        const records = await prisma.tabelKunjugan.findMany({
            where,
            orderBy: { tanggal_kunjungan: 'desc' },
            include: {
                DataPasien: true,
                DataDokter: true,
            }
        })

        const KLINIK = {
            1: 'IKGP', 2: 'Periodonsia', 3: 'IPM', 4: 'IKGA', 5: 'Konservasi',
            6: 'Prostodonsia', 7: 'Bedah Mulut', 8: 'Ortodonsia', 9: 'Radiologi',
        }

        // Generate CSV
        const headers = [
            'No. Kunjungan',
            'Tanggal',
            'Waktu',
            'No. Antrian',
            'Klinik',
            'No. RM Pasien',
            'Nama Pasien',
            'Cara Bayar',
            'Golongan Darah',
            'Dokter',
            'Status Kunjungan',
            'Status Pembayaran',
            'Biaya Layanan/Obat',
        ].join(',')

        const rows = records.map(r => {
            const dt = r.tanggal_kunjungan ? new Date(r.tanggal_kunjungan) : null
            const dateStr = dt ? dt.toISOString().split('T')[0] : ''
            const timeStr = dt ? dt.toTimeString().split(' ')[0] : ''
            const namaPasien = escapeCsv(r.DataPasien?.nama || '')
            const caraBayar = escapeCsv(r.DataPasien?.cara_bayar || '')
            const dokter = escapeCsv(r.DataDokter?.nama || '')
            const klinikName = KLINIK[r.id_klinik] || String(r.id_klinik)
            const stss = r.status === '0' ? 'Menunggu' : r.status === '1' ? 'Diperiksa' : 'Selesai'
            const payst = r.status_pembayaran === '1' ? 'Belum Lunas/Cicil' : r.status_pembayaran === '2' ? 'Lunas' : 'Belum Bayar'

            return [
                r.id_kunjungan,
                dateStr,
                timeStr,
                r.id_antrian,
                klinikName,
                r.DataPasien?.no_rekam_medis || r.id_pasien,
                namaPasien,
                caraBayar,
                r.DataPasien?.golongan_darah || '-',
                dokter,
                stss,
                payst,
                r.biaya_rekam_medis || 0
            ].join(',')
        })

        const csvContent = headers + '\n' + rows.join('\n')

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', `attachment; filename="export_kunjungan_${new Date().getTime()}.csv"`)
        return res.status(200).send(csvContent)

    } catch (err) {
        console.error('Export Error:', err)
        return res.status(500).json({ message: 'Terjadi kesalahan saat export CSV' })
    }
})

function escapeCsv(str) {
    if (!str) return ''
    const s = String(str).replace(/"/g, '""')
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return `"${s}"`
    }
    return s
}
