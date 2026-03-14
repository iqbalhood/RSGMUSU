const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding admin user...')

    // Create default admin user (akses=1)
    const existing = await prisma.dcaUser.findFirst({ where: { username: 'admin' } })
    if (!existing) {
        const hashed = await bcrypt.hash('admin123', 10)
        await prisma.dcaUser.create({
            data: { username: 'admin', password: hashed, akses: '1' },
        })
        console.log('✓ Admin user created (username: admin, password: admin123)')
    } else {
        console.log('→ Admin user already exists, skipping...')
    }

    console.log('Seeding complete!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())
