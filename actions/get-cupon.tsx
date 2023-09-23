"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCupon = async (userId: string) => {
  // get cupons by userId from prisma on many to many relationship
  const cupons = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      cupons: true,
    },
  });

  return JSON.stringify(cupons);
};

export default getCupon;
