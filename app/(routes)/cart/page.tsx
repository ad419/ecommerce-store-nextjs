import getCupons from "@/actions/get-cupons";
import LayoutPage from "./components/layout";
import { headers } from "next/headers";
const CartPage = async () => {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const storeId = fullUrl.split("store=")[1];
  const cupons = await getCupons(storeId);
  return <LayoutPage cupons={cupons} />;
};

export default CartPage;
