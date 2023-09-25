import { PrismaClient } from "@prisma/client";

const getStores = async () => {
  const prisma = new PrismaClient();

  const stores = await prisma.store.findMany();

  return JSON.parse(JSON.stringify(stores));
};

export default getStores;
