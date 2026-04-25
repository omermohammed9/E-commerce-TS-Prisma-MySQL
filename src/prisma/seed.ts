import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clear existing data
  await prisma.orderDetail.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      passwordHash: adminPassword,
      firstName: 'System',
      lastName: 'Admin',
      role: 'ADMIN',
      phoneNumber: '1234567890',
      address: 'Admin Headquarters'
    }
  })

  // Create Demo User
  const userPassword = await bcrypt.hash('user123', 10)
  const user = await prisma.user.create({
    data: {
      username: 'johndoe',
      email: 'john@example.com',
      passwordHash: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
      phoneNumber: '0987654321',
      address: '123 Main St, Anytown, USA'
    }
  })

  // Create Products
  const products = [
    {
      name: 'Premium Wireless Headphones',
      description: 'Experience crystal-clear audio with our latest noise-canceling technology. 40-hour battery life and ergonomic design.',
      price: 299.99,
      stockQuantity: 50,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'
    },
    {
      name: 'Smart Watch Series X',
      description: 'Track your fitness, receive notifications, and stay connected on the go. Waterproof up to 50 meters.',
      price: 199.50,
      stockQuantity: 35,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
    },
    {
      name: 'Minimalist Leather Wallet',
      description: 'Handcrafted from genuine Italian leather. Slim design with RFID protection for up to 10 cards.',
      price: 45.00,
      stockQuantity: 120,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'
    },
    {
      name: 'Organic Cotton Tee',
      description: 'Soft, breathable, and sustainably sourced. The perfect essential for your everyday wardrobe.',
      price: 25.00,
      stockQuantity: 200,
      category: 'Clothing',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'
    },
    {
      name: 'Designer Sunglasses',
      description: 'UV400 protection with a timeless aviator frame. Includes a hard leather case and cleaning cloth.',
      price: 159.00,
      stockQuantity: 15,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop'
    },
    {
      name: 'Ceramic Coffee Set',
      description: 'Set of 4 hand-glazed ceramic mugs with matching saucers. Microwave and dishwasher safe.',
      price: 55.99,
      stockQuantity: 40,
      category: 'Home',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop'
    }
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
