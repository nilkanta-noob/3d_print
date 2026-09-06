import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@printhub.com' },
    update: {},
    create: {
      email: 'admin@printhub.com',
      name: 'System Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  
  console.log('Seed completed. Admin user created:', { id: admin.id, email: admin.email })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
