"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const activeStore = localStorage.getItem("store");
  const activeStoreId = activeStore ? JSON.parse(activeStore).id : "";
  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/${activeStoreId}/checkout`,
      { productIds: items.map((item) => item.id) }
    );

    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        // disable if product store id is not equal to active store id
        disabled={
          items.some((item) => item.storeId !== activeStoreId) ||
          items.length === 0
        }
        className="w-full mt-6"
      >
        Checkout
      </Button>
      {/*
        notify user if product store id is not equal to active store id
      */}
      {items.some((item) => item.storeId !== activeStoreId) && (
        <p className="text-sm text-red-500 mt-2">
          You have items from another store in your cart. Please checkout
          separately.
        </p>
      )}
      {/*
        notify user if he is readyt to checkout 
      */}
      {items.length > 0 &&
        items.every((item) => item.storeId === activeStoreId) && (
          <p className="text-sm text-green-500 mt-2">
            You are ready to checkout.
          </p>
        )}
    </div>
  );
};

export default Summary;
