const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET /api/search/pasien?keyword=
// GET /api/search/layanan?keyword=
// GET /api/search/perawatan?keyword=
module.exports = requireAuth(async (req, res) => {
    const { type } = req.query || {}
    const keyword = req.query.keyword || ''

    if (type === 'pasien' || !type) {
        const rows = await prisma.dataPasien.findMany({
            where: { OR: [{ nama: { contains: keyword } }, { no_rekam_medis: { contains: keyword } }] },
            take: 20,
        })
        return res.status(200).json({ event: rows })
    }

    if (type === 'layanan') {
        const rows = await prisma.dataLayanan.findMany({ where: { layanan: { contains: keyword } }, take: 20 })
        return res.status(200).json({ event: rows })
    }

    if (type === 'perawatan') {
        const rows = await prisma.perawatan.findMany({ where: { OR: [{ diagnosa: { contains: keyword } }, { perawatan: { contains: keyword } }] }, take: 20 })
        return res.status(200).json({ event: rows })
    }

    return res.status(400).json({ message: 'Unknown search type' })
})
