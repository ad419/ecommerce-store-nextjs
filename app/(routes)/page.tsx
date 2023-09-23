import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import { headers } from "next/headers";
import getCupons from "@/actions/get-cupons";

export const revalidate = 0; // to make sure it's never cached

const HomePage = async () => {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const storeId = fullUrl.split("store=")[1];
  const storeBillboard = (await getBillboard(storeId)) as any;
  const billboard = storeBillboard.filter(
    (item: any) => item.isActive === true
  )[0];
  // remove the array wrapper
  const cupons = await getCupons(storeId);
  const products = await getProducts({ isFeatured: true }, storeId);

  return (
    <div className="mx-auto max-w-7xl overflow-y-hidden">
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} cupons={cupons} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
