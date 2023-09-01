import { Category } from "@/types";

const getCategories = async (storeId: any): Promise<Category[]> => {
  const SELECTED_STORE_URL = `${process.env.NEXT_PUBLIC_API_URL_BASE}/${storeId}/categories`;
  const URL = `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/categories`;
  const res = await fetch(
    // if selected store URL does not contain undefined, use it, otherwise use the default URL
    SELECTED_STORE_URL.includes("undefined") ? URL : SELECTED_STORE_URL
  );
  return res.json();
};

export default getCategories;
