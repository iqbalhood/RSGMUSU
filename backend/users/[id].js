const bcrypt = require('bcryptjs')
const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

// GET/PUT/DELETE /api/users/:id
module.exports = requireAuth(async (req, res) => {
    const id = parseInt(req.query.id || '')
    if (isNaN(id)) return res.status(400).json({ message: 'ID tidak valid' })

    if (req.method === 'GET') {
        const row = await prisma.dcaUser.findUnique({ where: { id }, select: { id: true, username: true, akses: true } })
        if (!row) return res.status(404).json({ message: 'User tidak ditemukan' })
        return res.status(200).json(row)
    }

    if (req.method === 'PUT') {
        const { username, password, akses } = req.body || {}
        const data = {}
        if (username !== undefined) data.username = username
        if (akses !== undefined) data.akses = akses
        if (password) data.password = await bcrypt.hash(password, 10) // only update if provided
        await prisma.dcaUser.update({ where: { id }, data })
        return res.status(200).json({ message: 'OK' })
    }

    if (req.method === 'DELETE') {
        await prisma.dcaUser.delete({ where: { id } })
        return res.status(200).json({ message: 'Deleted' })
    }

    return res.status(405).json({ message: 'Method not allowed' })
})
