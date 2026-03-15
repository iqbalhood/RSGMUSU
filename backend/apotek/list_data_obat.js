const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET /api/apotek/list_data_obat — list drugs (apotek context)
module.exports = requireAuth(async (req, res) => {
    if (req.method === 'GET') {
        const rows = await prisma.dataObat.findMany({ orderBy: { nama: 'asc' } })
        return res.status(200).json({ event: rows })
    }
    return res.status(405).json({ message: 'Method not allowed' })
})
