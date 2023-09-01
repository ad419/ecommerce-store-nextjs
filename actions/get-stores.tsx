import { Store } from "@/types";

const getStores = async (): Promise<Store[]> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/get-stores`;
  const res = await fetch(URL);
  return res.json();
};

export default getStores;
