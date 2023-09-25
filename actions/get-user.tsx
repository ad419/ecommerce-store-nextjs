"use server";
import { PrismaClient } from "@prisma/client";

const getUser = async (userId: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      cupons: true,
      accounts: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return JSON.stringify({
    message: "User found successfully",
    userData: user,
    status: 200,
  });
};

export default getUser;
