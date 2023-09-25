import { Cupon } from "@/types";

const getCupons = async (storeId: any): Promise<Cupon[]> => {
  const SELECTED_STORE_URL = `${process.env.NEXT_PUBLIC_API_URL_BASE}/${storeId}/cupons`;
  const URL = `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/cupons`;
  const res = await fetch(
    // if selected store URL does not contain undefined, use it, otherwise use the default URL
    SELECTED_STORE_URL.includes("undefined") ? URL : SELECTED_STORE_URL
  );
  return res.json();
};

export default getCupons;
