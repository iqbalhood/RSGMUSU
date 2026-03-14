const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

// GET /api/kunjungan/:id  — get one visit full (+ pasien summary)
// PUT /api/kunjungan/:id/complete — mark as paid
module.exports = requireAuth(async (req, res) => {
    const id = req.query.id // id_kunjungan (string)

    if (req.method === 'GET') {
        const visit = await prisma.tabelKunjugan.findFirst({ where: { id_kunjungan: id } })
        if (!visit) return res.status(404).json({ message: 'Kunjungan tidak ditemukan' })
        const pasien = await prisma.dataPasien.findUnique({ where: { id: visit.id_pasien } })
        const rm = await prisma.rekamMedis.findUnique({ where: { id_kunjungan: id } })
        return res.status(200).json({ ...visit, pasien, rekam_medis: rm })
    }

    if (req.method === 'PUT') {
        const { action } = req.query
        if (action === 'complete') {
            await prisma.tabelKunjugan.updateMany({
                where: { id_kunjungan: id },
                data: { status_pembayaran: '2', tanggal_pembayaran: new Date() },
            })
            return res.status(200).json({ message: 'OK' })
        }
        return res.status(400).json({ message: 'Unknown action' })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
