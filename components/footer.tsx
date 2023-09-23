import { headers } from "next/headers";

const Footer = () => {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";

  // if pathname is /join, return null

  if (fullUrl.includes("join")) {
    return null;
  }

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-black">
          &copy; 2023 E-commerce Store, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
