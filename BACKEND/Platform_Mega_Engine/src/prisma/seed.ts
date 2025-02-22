import prisma from "./prismaconnect/prisma.js";

async function main() {
  // Create 5 dummy users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: {
          username: `user${Math.floor(Math.random() * 10000)}`,
          email: `user${Math.floor(Math.random() * 10000)}@example.com`,
          fullName: `User ${Math.floor(Math.random() * 10000)}`,
          password: "password123", // Use a hashed password in production
          refreshToken: "sample-refresh-token",
          description: "This is a description",
        },
      })
    )
  );

  // Create 5 dummy blog posts for each user
  await Promise.all(
    users.map((user) =>
      prisma.blogPost.createMany({
        data: Array.from({ length: 5 }).map(() => ({
          title: `Blog Post ${Math.floor(Math.random() * 10000)}`,
          description: "This is a blog post description.",
          isPublished: true,
          duration: 120.5,
          views: Math.floor(Math.random() * 1000),
          ownerId: user.id,
        })),
      })
    )
  );

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
