"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const claimCuponDb = async (userId: string, cuponId: string) => {
  // Ensure that both the user and cupon exist before connecting them
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const existingCupon = await prisma.cupon.findUnique({
    where: {
      id: cuponId,
    },
  });

  if (!existingUser || !existingCupon) {
    // Handle the case where either the user or cupon doesn't exist
    throw new Error("User or Cupon not found");
  }

  // Use the UserToCupon model to create the connection
  const userToCupon = await prisma.userToCupon.create({
    data: {
      userId: userId,
      cuponId: cuponId,
    },
  });

  // return response from prisma

  return JSON.stringify({
    message: "Cupon claimed",
    userToCupon,
    status: 200,
  });
};

export default claimCuponDb;
