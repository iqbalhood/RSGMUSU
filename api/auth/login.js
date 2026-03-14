const bcrypt = require('bcryptjs')
const prisma = require('../_lib/db')
const { signToken } = require('../_lib/auth')

// POST /api/auth/login
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { username, password } = req.body || {}
    if (!username || !password) {
        return res.status(400).json({ message: 'Username dan password wajib diisi' })
    }

    try {
        const user = await prisma.dcaUser.findFirst({ where: { username } })
        if (!user) {
            return res.status(401).json({ status: 'wrong', message: 'Username atau password salah' })
        }

        // Support both bcrypt hashes and legacy plain-text (for migration)
        let valid = false
        if (user.password && user.password.startsWith('$2')) {
            valid = await bcrypt.compare(password, user.password)
        } else {
            valid = user.password === password
        }

        if (!valid) {
            return res.status(401).json({ status: 'wrong', message: 'Username atau password salah' })
        }

        const token = signToken({ id: user.id, username: user.username, akses: user.akses })
        return res.status(200).json({
            status: 'correct',
            token,
            akses: user.akses,
            user: { id: user.id, username: user.username, akses: user.akses },
        })
    } catch (err) {
        console.error('[login]', err)
        return res.status(500).json({ message: 'Server error' })
    }
}
