import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import { headers } from "next/headers";
import getCupons from "@/actions/get-cupons";
export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const storeId = fullUrl.split("store=")[1];

  const products = await getProducts(
    {
      categoryId: params.categoryId,
      colorId: searchParams.colorId,
      sizeId: searchParams.sizeId,
    },
    storeId
  );
  const sizes = await getSizes();

  const colors = await getColors();
  const category = await getCategory(params.categoryId);
  const cupons = await getCupons(storeId);
  return (
    <div className="bg-white">
      <Container>
        {/* ts-ignore */}
        <Billboard data={category.billboard} cupons={cupons} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* Add Mobile Filters */}
            <MobileFilters sizes={sizes} colors={colors} products={products} />
            <div className="hidden lg:block">
              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
                products={products}
              />
              <Filter
                valueKey="colorId"
                name="Colors"
                data={colors}
                products={products}
              />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
