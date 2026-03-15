const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET /api/kunjungan/kasir/paid?tawal=&takhir=&klinik=&status=  — paid visits search
// GET /api/kunjungan/kasir/today                                  — paid today
module.exports = requireAuth(async (req, res) => {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' })

    const { tawal, takhir, klinik, sub } = req.query || {}

    if (sub === 'today') {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const rows = await prisma.tabelKunjugan.findMany({
            where: { status_pembayaran: '2', tanggal_pembayaran: { gte: today, lt: tomorrow } },
            orderBy: { id: 'desc' },
        })
        return res.status(200).json({ event: rows })
    }

    // Default: paid/search with date range
    const where = { status_pembayaran: '2' }
    if (tawal) where.tanggal_pembayaran = { ...(where.tanggal_pembayaran || {}), gte: new Date(tawal) }
    if (takhir) where.tanggal_pembayaran = { ...(where.tanggal_pembayaran || {}), lte: new Date(takhir) }
    if (klinik) where.id_klinik = parseInt(klinik)

    const rows = await prisma.tabelKunjugan.findMany({ where, orderBy: { id: 'desc' } })
    return res.status(200).json({ event: rows })
})
