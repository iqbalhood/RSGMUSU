const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET /api/obat | POST /api/obat
module.exports = requireAuth(async (req, res) => {
    if (req.method === 'GET') {
        const rows = await prisma.dataObat.findMany({ orderBy: { nama: 'asc' } })
        return res.status(200).json({ event: rows })
    }
    if (req.method === 'POST') {
        const { nama, quantity, satuan, harga } = req.body || {}
        const created = await prisma.dataObat.create({ data: { nama: nama || '', quantity: quantity || '', satuan: satuan || '', harga: parseInt(harga) || 0 } })
        return res.status(201).json({ id: created.id })
    }
    return res.status(405).json({ message: 'Method not allowed' })
})
