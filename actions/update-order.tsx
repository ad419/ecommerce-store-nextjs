"use server";

import { PrismaClient } from "@prisma/client";

const updateOrder = async (orderId: string) => {
  const prisma = new PrismaClient();

  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      isPaid: true,
    },
  });

  return JSON.stringify({
    message: "Order updated successfully",
    updatedOrder: updatedOrder,
    status: 200,
  });
};

export default updateOrder;
