"use client";
import { Store } from "@/types";
import { useState, useEffect } from "react";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export function StoreSwitcher({ stores }: { stores: Store[] }) {
  const [open, setOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | any>();
  function saveStoreURLLocally(store: Store) {
    // also add param to URL
    window.history.pushState({}, "", `?store=${store.id}`);
    localStorage.setItem("store", JSON.stringify(store));
    setSelectedStore(store);
    window.location.href = "/";
  }

  // fix Error: Text content does not match server-rendered HTML. Warning: Text content did not match. Server: "Select a store" Client: "updater"

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("store")) {
      setSelectedStore(JSON.parse(localStorage.getItem("store") as string));
    }
  }, []);

  return (
    <div className="">
      <button
        className="text-black relative font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span className="mr-2.5">
          {selectedStore?.name ? selectedStore?.name : "Select a store"}
        </span>

        <ChevronDownIcon
          className={`w-4 h-4 transition-transform transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <br />
      {open && (
        <div className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-2 flex">
          <div className="absolute rounded shadow bg-white overflow-hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
            {stores.map((store) => (
              <div
                key={store.id}
                onClick={() => {
                  setSelectedStore(store as Store);
                  setOpen(false);
                  // delay the saving of the store URL locally
                  setTimeout(() => {
                    saveStoreURLLocally(store);
                  }, 1000);
                }}
                className="cursor-pointer group"
              >
                <h1 className="block p-2 border-transparent border-l-4 group-hover:border-black group-hover:bg-gray-100 relative">
                  {" "}
                  {/* Added "relative" class here */}
                  {store.name}
                  {selectedStore?.name === store?.name && (
                    <div className="absolute top-0 right-0 p-2">
                      <CheckIcon />
                    </div>
                  )}
                </h1>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
