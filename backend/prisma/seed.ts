import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  // Clear existing data
  await prisma.reportRegistered.deleteMany();
  await prisma.paymentProduct.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.report.deleteMany();
  await prisma.product.deleteMany();
  await prisma.module.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        name: 'María García',
        email: 'maria.garcia@email.com',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Carlos López',
        email: 'carlos.lopez@email.com',
        isActive: false,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Luis Rodríguez',
        email: 'luis.rodriguez@email.com',
        isActive: true,
      },
    }),
  ]);

  console.log('✅ Created users');

  // Create Modules
  const modules = await Promise.all([
    prisma.module.create({
      data: {
        name: 'Ventas',
        description: 'Módulo de gestión de ventas',
        isActive: true,
      },
    }),
    prisma.module.create({
      data: {
        name: 'Clientes',
        description: 'Módulo de gestión de clientes',
        isActive: true,
      },
    }),
    prisma.module.create({
      data: {
        name: 'Productos',
        description: 'Módulo de gestión de productos',
        isActive: true,
      },
    }),
    prisma.module.create({
      data: {
        name: 'Inventario',
        description: 'Módulo de control de inventario',
        isActive: false,
      },
    }),
  ]);

  console.log('✅ Created modules');

  // Create Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Laptop HP Pavilion',
        stock: 25,
        price: 899.99,
        category: 'Electrónicos',
        sold: 5,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Mouse Logitech',
        stock: 150,
        price: 29.99,
        category: 'Accesorios',
        sold: 45,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Teclado Mecánico',
        stock: 75,
        price: 149.99,
        category: 'Accesorios',
        sold: 12,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Monitor 24"',
        stock: 30,
        price: 299.99,
        category: 'Electrónicos',
        sold: 8,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Silla Ergonómica',
        stock: 20,
        price: 199.99,
        category: 'Mobiliario',
        sold: 3,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Webcam HD',
        stock: 80,
        price: 79.99,
        category: 'Accesorios',
        sold: 22,
      },
    }),
  ]);

  console.log('✅ Created products');

  // Create Reports
  const reports = await Promise.all([
    prisma.report.create({
      data: {
        moduleId: modules[0].id, // Ventas
        isActive: true,
      },
    }),
    prisma.report.create({
      data: {
        moduleId: modules[1].id, // Clientes
        isActive: true,
      },
    }),
    prisma.report.create({
      data: {
        moduleId: modules[2].id, // Productos
        isActive: true,
      },
    }),
    prisma.report.create({
      data: {
        moduleId: modules[0].id, // Ventas
        isActive: false,
      },
    }),
  ]);

  console.log('✅ Created reports');

  // Create Payments
  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        userId: users[0].id,
        value: 1299.97,
        status: 'completed',
      },
    }),
    prisma.payment.create({
      data: {
        userId: users[1].id,
        value: 459.97,
        status: 'pending',
      },
    }),
    prisma.payment.create({
      data: {
        userId: users[2].id,
        value: 229.98,
        status: 'completed',
      },
    }),
    prisma.payment.create({
      data: {
        userId: users[3].id,
        value: 899.99,
        status: 'failed',
      },
    }),
    prisma.payment.create({
      data: {
        userId: users[4].id,
        value: 79.99,
        status: 'completed',
      },
    }),
  ]);

  console.log('✅ Created payments');

  // Create PaymentProduct relationships
  await Promise.all([
    // Payment 1: Laptop + Monitor + Silla
    prisma.paymentProduct.create({
      data: {
        pagoId: payments[0].id,
        productId: products[0].id,
        cantidad: 1,
      },
    }),
    prisma.paymentProduct.create({
      data: {
        pagoId: payments[0].id,
        productId: products[3].id,
        cantidad: 1,
      },
    }),
    prisma.paymentProduct.create({
      data: {
        pagoId: payments[0].id,
        productId: products[4].id,
        cantidad: 1,
      },
    }),
    // Payment 2: Teclado + Mouse + Webcam
    prisma.paymentProduct.create({
      data: {
        pagoId: payments[1].id,
        productId: products[2].id,
        cantidad: 1,
      },
    }),
    prisma.paymentProduct.create({
      data: {
        pagoId: payments[1].id,
        productId: products[1].id,
        cantidad: 3,
      },
    }),
    prisma.paymentProduct.create({
      data: {
        pagoId: payments[1].id,
        productId: products[5].id,
        cantidad: 2,
      },
    }),
    // Payment 3: Mouse + Webcam
    prisma.paymentProduct.create({
      data: {
        pagoId: payments[2].id,
        productId: products[1].id,
        cantidad: 5,
      },
    }),
    prisma.paymentProduct.create({
      data: {
        pagoId: payments[2].id,
        productId: products[5].id,
        cantidad: 1,
      },
    }),
    // Payment 4: Laptop
    prisma.paymentProduct.create({
      data: {
        pagoId: payments[3].id,
        productId: products[0].id,
        cantidad: 1,
      },
    }),
    // Payment 5: Webcam
    prisma.paymentProduct.create({
      data: {
        pagoId: payments[4].id,
        productId: products[5].id,
        cantidad: 1,
      },
    }),
  ]);

  console.log('✅ Created payment-product relationships');

  // Create ReportRegistered entries
  await Promise.all([
    prisma.reportRegistered.create({
      data: {
        reportId: reports[0].id,
        content: JSON.stringify({
          totalSales: 2969.91,
          salesCount: 5,
          topProduct: 'Laptop HP Pavilion',
          period: 'Enero 2025',
        }),
      },
    }),
    prisma.reportRegistered.create({
      data: {
        reportId: reports[1].id,
        content: JSON.stringify({
          totalClients: 5,
          activeClients: 4,
          newClients: 2,
          period: 'Enero 2025',
        }),
      },
    }),
    prisma.reportRegistered.create({
      data: {
        reportId: reports[2].id,
        content: JSON.stringify({
          totalProducts: 6,
          lowStock: 1,
          totalValue: 82499.4,
          bestSeller: 'Mouse Logitech',
        }),
      },
    }),
  ]);

  console.log('✅ Created report registered entries');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
