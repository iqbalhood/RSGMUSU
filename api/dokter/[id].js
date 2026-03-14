const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

// GET /api/dokter/:id | PUT /api/dokter/:id | DELETE /api/dokter/:id
module.exports = requireAuth(async (req, res) => {
    const id = parseInt(req.query.id || '')
    if (isNaN(id)) return res.status(400).json({ message: 'ID tidak valid' })

    if (req.method === 'GET') {
        const dok = await prisma.dataDokter.findUnique({ where: { id } })
        if (!dok) return res.status(404).json({ message: 'Dokter tidak ditemukan' })
        return res.status(200).json(dok)
    }
    if (req.method === 'PUT') {
        const { nama, jenis_kelamin, nomor_hp } = req.body || {}
        const data = {}
        if (nama !== undefined) data.nama = nama
        if (jenis_kelamin !== undefined) data.jenis_kelamin = jenis_kelamin
        if (nomor_hp !== undefined) data.nomor_hp = nomor_hp
        await prisma.dataDokter.update({ where: { id }, data })
        return res.status(200).json({ message: 'OK' })
    }
    if (req.method === 'DELETE') {
        await prisma.dataDokter.delete({ where: { id } })
        return res.status(200).json({ message: 'Deleted' })
    }
    return res.status(405).json({ message: 'Method not allowed' })
})
