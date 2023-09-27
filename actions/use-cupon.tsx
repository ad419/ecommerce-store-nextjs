"use server";

import { PrismaClient } from "@prisma/client";

const updateCupon = async (
  cuponId: string,
  usedAtProduct: string,
  usedAt: any
) => {
  const prisma = new PrismaClient();

  const updatedCupon = await prisma.userToCupon.updateMany({
    where: {
      cuponId: cuponId,
    },
    data: {
      used: true,
      usedAtProduct: usedAtProduct,
      usedAt: usedAt,
    },
  });
};

export default updateCupon;
