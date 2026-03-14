const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

// PUT /api/obat/:id?context=kunjungan  — update obat visit line
// DELETE /api/obat/:id?context=kunjungan — delete obat visit line
// PUT /api/obat/:id  — update master obat
// DELETE /api/obat/:id — delete master obat
module.exports = requireAuth(async (req, res) => {
    const id = parseInt(req.query.id || '')
    const { context } = req.query

    if (isNaN(id)) return res.status(400).json({ message: 'ID tidak valid' })

    if (context === 'kunjungan') {
        if (req.method === 'PUT') {
            const { nama_obat, quantity, satuan, harga } = req.body || {}
            const data = {}
            if (nama_obat !== undefined) data.nama_obat = nama_obat
            if (quantity !== undefined) data.quantity = String(quantity)
            if (satuan !== undefined) data.satuan = satuan
            if (harga !== undefined) data.harga = String(harga)
            await prisma.tabelObatKunjungan.update({ where: { id }, data })
            return res.status(200).json({ message: 'OK' })
        }
        if (req.method === 'DELETE') {
            await prisma.tabelObatKunjungan.delete({ where: { id } })
            return res.status(200).json({ message: 'Deleted' })
        }
    }

    // Master obat
    if (req.method === 'GET') {
        const row = await prisma.dataObat.findUnique({ where: { id } })
        if (!row) return res.status(404).json({ message: 'Obat tidak ditemukan' })
        return res.status(200).json(row)
    }
    if (req.method === 'PUT') {
        const { nama, quantity, satuan, harga } = req.body || {}
        const data = {}
        if (nama !== undefined) data.nama = nama
        if (quantity !== undefined) data.quantity = quantity
        if (satuan !== undefined) data.satuan = satuan
        if (harga !== undefined) data.harga = parseInt(harga) || 0
        await prisma.dataObat.update({ where: { id }, data })
        return res.status(200).json({ message: 'OK' })
    }
    if (req.method === 'DELETE') {
        await prisma.dataObat.delete({ where: { id } })
        return res.status(200).json({ message: 'Deleted' })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
