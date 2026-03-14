const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

// GET  /api/dokter          — list (filter by id_klinik optional)
// POST /api/dokter          — create
module.exports = requireAuth(async (req, res) => {
    if (req.method === 'GET') {
        const rows = await prisma.dataDokter.findMany({ orderBy: { nama: 'asc' } })
        return res.status(200).json({ event: rows })
    }
    if (req.method === 'POST') {
        const { nama, jenis_kelamin, nomor_hp } = req.body || {}
        const created = await prisma.dataDokter.create({ data: { nama: nama || '', jenis_kelamin: jenis_kelamin || 'L', nomor_hp: nomor_hp || '' } })
        return res.status(201).json({ id: created.id })
    }
    return res.status(405).json({ message: 'Method not allowed' })
})
