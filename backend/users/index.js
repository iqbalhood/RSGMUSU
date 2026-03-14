const bcrypt = require('bcryptjs')
const prisma = require('../../_lib/db')
const { requireAuth } = require('../../_lib/auth')

// GET /api/users | POST /api/users
module.exports = requireAuth(async (req, res) => {
    if (req.method === 'GET') {
        const rows = await prisma.dcaUser.findMany({
            select: { id: true, username: true, akses: true },
            orderBy: { id: 'asc' },
        })
        return res.status(200).json({ event: rows })
    }
    if (req.method === 'POST') {
        const { username, password, akses } = req.body || {}
        if (!password) return res.status(400).json({ message: 'Password wajib diisi' })
        const hashed = await bcrypt.hash(password, 10)
        const created = await prisma.dcaUser.create({ data: { username, password: hashed, akses: akses || '3' } })
        return res.status(201).json({ id: created.id })
    }
    return res.status(405).json({ message: 'Method not allowed' })
})
