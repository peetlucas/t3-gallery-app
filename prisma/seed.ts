import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const alice = await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@example.com',
        posts: {
          create: {
            title: 'Alice\'s first post',
            imageUrl: 'Content of Alice\'s first post',
          },
        },
      },
    });

    const bob = await prisma.user.create({
      data: {
        name: 'Bob',
        email: 'bob@example.com',
        posts: {
          create: [
            {
              title: 'Bob\'s first post',
              imageUrl: 'Content of Bob\'s first post',
            },
            {
              title: 'Bob\'s second post',
              imageUrl: 'Content of Bob\'s second post',
            },
          ],
        },
      },
    });

    console.log('Seed data has been created.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    // Call the function without returning a promise
    prisma.$disconnect().then(() => {
      console.log('Disconnected from database');
    }).catch((e) => {
      console.error('Error disconnecting from database:', e);
    });
  }
}

void main();
