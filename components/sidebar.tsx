"use client";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dialog } from "@headlessui/react";

export default function Sidebar({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const routes = categories?.map((route) => ({
    href: `/category/${route?.id}`,
    label: route?.name,
    active: pathname === `/category/${route?.id}`,
  }));
  return (
    <div className="z-50">
      <div className="flex items-center justify-center md:hidden">
        {open ? (
          <button
            onClick={() => setOpen(!open)}
            className="text-black relative font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center"
            type="button"
          >
            <span>
              <Cross1Icon className="w-6 h-6" />
            </span>
          </button>
        ) : (
          <button
            onClick={() => setOpen(!open)}
            className="text-black relative font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center transition-transform ease-in-out duration-300"
            type="button"
          >
            <span>
              <HamburgerMenuIcon className="w-6 h-6" />
            </span>
          </button>
        )}
      </div>
      {open && (
        <div
          className={`fixed h-full ease-in-out duration-300 w-2/4
        bg-gray-100 z-[40] -left-[0.1px] pl-3 mt-[10px] -top-4
            shadow-lg shadow-accent-2 shadow-slate-600
        `}
        >
          <button
            onClick={() => setOpen(!open)}
            className="text-black relative font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center transition-transform ease-in-out duration-300 mt-4 ml-1"
            type="button"
          >
            <span>
              <Cross1Icon className="w-6 h-6" />
            </span>
          </button>
          <div className="flex flex-col items-start justify-start space-y-3 mt-16">
            <Link href="/" className="text-md font-medium text-neutral-500">
              Home
            </Link>
            {routes?.map((route) => (
              <Link
                href={route?.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-black",
                  route?.active ? "text-black" : "text-neutral-500"
                )}
                onClick={() => setOpen(!open)}
              >
                {route?.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
