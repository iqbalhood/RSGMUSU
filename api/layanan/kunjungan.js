const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

// GET /api/layanan/kunjungan?id_kunjungan=  — list layanan lines for a visit
// POST /api/layanan/kunjungan               — add layanan line to visit
module.exports = requireAuth(async (req, res) => {
    if (req.method === 'GET') {
        const { id_kunjungan } = req.query || {}
        if (!id_kunjungan) return res.status(400).json({ message: 'id_kunjungan required' })
        const rows = await prisma.tabelLayananKunjungan.findMany({
            where: { id_kunjungan: String(id_kunjungan) },
            orderBy: { id: 'asc' },
        })
        return res.status(200).json({ event: rows })
    }

    if (req.method === 'POST') {
        const { id_pasien, nama_pasien, id_kunjungan, id_antrian, nama_layanan, harga_bahan, harga_layanan } = req.body || {}
        const created = await prisma.tabelLayananKunjungan.create({
            data: {
                id_pasien: String(id_pasien || ''),
                nama_pasien: nama_pasien || '',
                id_kunjungan: String(id_kunjungan || ''),
                id_antrian: String(id_antrian || ''),
                nama_layanan: nama_layanan || '',
                harga_bahan: String(harga_bahan || '0'),
                harga_layanan: String(harga_layanan || '0'),
                status: '0',
            },
        })
        return res.status(201).json({ id: created.id })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
