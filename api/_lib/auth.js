const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || 'rsgm-usu-secret-change-me'

function signToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: '8h' })
}

/**
 * Verifies the JWT from the Authorization header.
 * Returns decoded payload or throws with 401 status.
 */
function verifyToken(req) {
    const auth = req.headers && req.headers['authorization']
    if (!auth || !auth.startsWith('Bearer ')) {
        const err = new Error('Unauthorized')
        err.status = 401
        throw err
    }
    const token = auth.slice(7)
    try {
        return jwt.verify(token, SECRET)
    } catch {
        const err = new Error('Token invalid or expired')
        err.status = 401
        throw err
    }
}

/**
 * Express-style middleware helper for Vercel handlers.
 * Attaches decoded user to req.user or sends 401.
 */
function requireAuth(handler) {
    return async (req, res) => {
        try {
            req.user = verifyToken(req)
            return handler(req, res)
        } catch (err) {
            return res.status(err.status || 401).json({ message: err.message })
        }
    }
}

module.exports = { signToken, verifyToken, requireAuth }
