import { Billboard } from "@/types";

const getBillboard = async (storeId: string): Promise<Billboard> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/billboards`;
  const SELECTED_STORE_URL = `${process.env.NEXT_PUBLIC_API_URL_BASE}/${storeId}/billboards`;

  const res = await fetch(
    // if selected store URL does not contain undefined, use it, otherwise use the default URL
    SELECTED_STORE_URL.includes("undefined") ? URL : SELECTED_STORE_URL
  );
  return res.json();
};

export default getBillboard;
