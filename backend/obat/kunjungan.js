const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET /api/obat/kunjungan?id_kunjungan=  — list obat lines for a visit
// POST /api/obat/kunjungan               — add obat to visit
module.exports = requireAuth(async (req, res) => {
    if (req.method === 'GET') {
        const { id_kunjungan } = req.query || {}
        if (!id_kunjungan) return res.status(400).json({ message: 'id_kunjungan required' })
        const rows = await prisma.tabelObatKunjungan.findMany({
            where: { id_kunjungan: String(id_kunjungan) },
            orderBy: { id: 'asc' },
        })
        return res.status(200).json({ event: rows })
    }

    if (req.method === 'POST') {
        const { id_pasien, nama_pasien, id_kunjungan, id_antrian, id_obat, nama_obat, satuan, quantity, harga } = req.body || {}
        const created = await prisma.tabelObatKunjungan.create({
            data: {
                id_pasien: String(id_pasien || ''),
                nama_pasien: nama_pasien || '',
                id_kunjungan: String(id_kunjungan || ''),
                id_antrian: String(id_antrian || ''),
                id_obat: String(id_obat || ''),
                nama_obat: nama_obat || '',
                satuan: satuan || '',
                quantity: String(quantity || '1'),
                harga: String(harga || '0'),
                status: '0',
            },
        })
        return res.status(201).json({ id: created.id })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
