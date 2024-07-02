import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const alice = await prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@exam.com",
        posts: {
          create: [
            {
              title: "Alice first post",
              imageUrl:
                "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/3012c68d-d895-4c4d-8e3f-52c3fcd482dc-qorhd7.jpg",
            },
            {
              title: "Alice second post",
              imageUrl:
                "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/91a9c4c6-94a1-4736-9ab5-3b3bb90ddbd8-w2v8ba.jpg",
            },
            {
              title: "Alice third post",
              imageUrl:
                "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/feb9d4d3-ab33-40dd-ba2c-6d1f05b29983-i7hufi.jpg",
            },
          ],
        },
      },
    });

    const bob = await prisma.user.create({
      data: {
        name: "Bob",
        email: "bob@exam.com",
        posts: {
          create: [
            {
              title: "Bob's first post",
              imageUrl:
                "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/c13f418b-7dc8-4ad1-bdb8-7adf0877ee44-kft8eg.jpg",
            },
            {
              title: "Bob's second post",
              imageUrl:
                "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/6c154e09-344d-4ec7-b928-df05158dc2b4-pot1wn.jpg",
            },
            {
              title: "Bob's third post",
              imageUrl:
                "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/8434335e-c94c-4d7b-85f5-416bd3c3bf19-mcvv0e.jpg",
            },
          ],
        },
      },
    });

    console.log("Seed data has been created.");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    // Call the function without returning a promise
    prisma
      .$disconnect()
      .then(() => {
        console.log("Disconnected from database");
      })
      .catch((e) => {
        console.error("Error disconnecting from database:", e);
      });
  }
}

void main();
