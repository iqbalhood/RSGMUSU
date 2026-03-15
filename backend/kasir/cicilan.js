const prisma = require('../_lib/db')
const { requireAuth } = require('../_lib/auth')

// GET /api/kasir/cicilan?id_kunjungan= — list installments
// POST /api/kasir/cicilan              — add installment
module.exports = requireAuth(async (req, res) => {
    if (req.method === 'GET') {
        const { id_kunjungan } = req.query || {}
        const rows = await prisma.tabelCicilan.findMany({ where: { id_kunjugan: id_kunjungan || '' }, orderBy: { id: 'asc' } })
        return res.status(200).json({ event: rows })
    }

    if (req.method === 'POST') {
        const { idKunjungan, pembayaran, keterangan, tglpembayaran } = req.body || {}
        const created = await prisma.tabelCicilan.create({
            data: {
                id_kunjugan: idKunjungan || '',
                biaya: String(pembayaran || 0),
                keterangan: keterangan || '',
                tanggal: tglpembayaran ? new Date(tglpembayaran) : new Date(),
            },
        })
        return res.status(201).json({ id: created.id })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
