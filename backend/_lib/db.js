const { PrismaClient } = require('@prisma/client')

// Reuse PrismaClient across hot-reloads in development (Vercel)
const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}

module.exports = prisma
