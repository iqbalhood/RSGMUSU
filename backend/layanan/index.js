const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET /api/layanan?id=   — list by klinik
// POST /api/layanan      — create
module.exports = requireAuth(async (req, res) => {
    if (req.method === 'GET') {
        const { id } = req.query || {}
        const where = id ? { idklinik: parseInt(id) } : {}
        const rows = await prisma.dataLayanan.findMany({ where, orderBy: { layanan: 'asc' } })
        return res.status(200).json({ event: rows })
    }
    if (req.method === 'POST') {
        const { layanan, bahan, harga_bahan, idklinik, harga_koas, harga_drg, harga_drgsp } = req.body || {}
        const created = await prisma.dataLayanan.create({
            data: {
                layanan: layanan || '', bahan: bahan || '', harga_bahan: parseInt(harga_bahan) || 0,
                idklinik: parseInt(idklinik) || 1, harga_koas: parseInt(harga_koas) || 0,
                harga_drg: parseInt(harga_drg) || 0, harga_drgsp: parseInt(harga_drgsp) || 0,
            },
        })
        return res.status(201).json({ id: created.id })
    }
    return res.status(405).json({ message: 'Method not allowed' })
})
