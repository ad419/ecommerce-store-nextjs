import { Product } from "@/types";
import qs from "query-string";

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query, storeId: any): Promise<Product[]> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/products`;
  const SELECTED_STORE_URL = `${process.env.NEXT_PUBLIC_API_URL_BASE}/${storeId}/products`;
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });
  const res = await fetch(
    // if selected store URL does not contain undefined, use it, otherwise use the default URL
    SELECTED_STORE_URL.includes("undefined") ? url : SELECTED_STORE_URL
  );
  return res.json();
};

export default getProducts;
