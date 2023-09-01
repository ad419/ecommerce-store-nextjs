import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";
import getStores from "@/actions/get-stores";
import { StoreSwitcher } from "./storeSwitcher";
import { HomeIcon } from "@radix-ui/react-icons";
import { headers } from "next/headers";
import Sidebar from "./sidebar";

export const revalidate = 0; // to make sure it's never cached

const Navbar = async () => {
  let stores = [] as any;
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const storeId = fullUrl.split("store=")[1];
  const categories = await getCategories(storeId);
  try {
    stores = await getStores();
  } catch (error) {
    throw new Error("Error fetching stores");
  }

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link
            className=" items-center space-x-2 pr-2 hidden md:flex"
            href="/"
          >
            <HomeIcon className="w-6 h-6" />
          </Link>
          <Sidebar categories={categories} />
          <StoreSwitcher stores={stores} />
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
