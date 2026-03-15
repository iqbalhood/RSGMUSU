const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET /api/kunjungan           — list by klinik + status
// GET /api/kunjungan?kasir     — unpaid list
// GET /api/kunjungan/dashboard — dashboard counts
// POST /api/kunjungan          — create (submit_ke_klinik)
module.exports = requireAuth(async (req, res) => {
    // ---- GET ----
    if (req.method === 'GET') {
        const { id, status, kasir, dashboard } = req.query || {}

        // dashboard counts per klinik/status
        if (dashboard !== undefined) {
            const rows = await prisma.tabelKunjugan.findMany({
                where: {
                    ...(id ? { id_klinik: parseInt(id) } : {}),
                    ...(status !== undefined ? { status } : {}),
                },
                orderBy: { id: 'desc' },
            })
            return res.status(200).json({ event: rows })
        }

        // kasir: unpaid visits
        if (kasir !== undefined) {
            const rows = await prisma.tabelKunjugan.findMany({
                where: { status: '1', status_pembayaran: null },
                orderBy: { id: 'desc' },
            })
            return res.status(200).json({ event: rows })
        }

        // general list
        const where = {}
        if (id) where.id_klinik = parseInt(id)
        if (status !== undefined) where.status = status
        const rows = await prisma.tabelKunjugan.findMany({ where, orderBy: { id: 'desc' } })
        return res.status(200).json({ event: rows })
    }

    // ---- POST: create kunjungan (submit_ke_klinik) ----
    if (req.method === 'POST') {
        const { idKunjungan, idAntrian, idKlinik, newRekamMedis, dokterPendamping, idDokter, idPasien } = req.body || {}
        const today = new Date()
        await prisma.tabelKunjugan.create({
            data: {
                id_kunjungan: idKunjungan || `KJ${Date.now()}`,
                id_antrian: idAntrian || `ANT${Date.now()}`,
                id_klinik: parseInt(idKlinik) || 1,
                dokter_pendamping: dokterPendamping || '',
                id_dokter: parseInt(idDokter) || 0,
                id_pasien: parseInt(idPasien) || 0,
                status: '0',
                tanggal_kunjungan: today,
            },
        })
        return res.status(201).json({ message: 'OK' })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
