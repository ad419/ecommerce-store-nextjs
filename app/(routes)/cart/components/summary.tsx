"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import getUser from "@/actions/get-user";
import { useSession } from "next-auth/react";
import updateCupon from "@/actions/use-cupon";
import updateOrder from "@/actions/update-order";

const Summary = ({ cupons }: { cupons: any }) => {
  const searchParams = useSearchParams() as any;
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const activeStore = localStorage.getItem("store");
  const activeStoreId = activeStore ? JSON.parse(activeStore).id : "";
  const [user, setUser] = useState<any>(null);
  const { data: session } = useSession() as any;
  const [toggleApplyCoupon, setToggleApplyCoupon] = useState(false) as any;
  // get orderid from path id http://localhost:3000/cart?success=1?id=f72a0819-c96d-4537-bdf2-c3e503aaeccd
  const oderId = window.location.search.split("=")[2];
  async function getUserData() {
    const response = await getUser(session?.user?.id as string);
    setUser(JSON.parse(response));
  }

  async function updateOrderData() {
    await updateOrder(oderId);
  }

  async function updateCuponUsed() {
    await updateCupon(
      userCoupons[0]?.id,
      JSON.stringify(items),
      new Date().toISOString()
    );
  }

  const userCoupons = user?.userData?.cupons
    .map((userCupon: any) => {
      return cupons.find((cupon: any) => cupon.id === userCupon.cuponId);
    })
    .filter(Boolean);

  useEffect(() => {
    if (!session?.user?.id) return;
    getUserData();
  }, [session?.user?.id]);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      // set the coupon as used
      updateOrderData();
      updateCuponUsed();
      // delay remove all items from cart
      setTimeout(() => {
        removeAll();
      }, 5000);
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  console.log("user", user?.userData);

  const totalPrice = items.reduce((total, item) => {
    // Find the user's active coupon for the store of the current item
    const userCoupon = user?.userData?.cupons?.find(
      (coupon: any) =>
        coupon.used === false &&
        coupon.usedAtProduct === null &&
        coupon.userId === user.id &&
        coupon.storeId === item.storeId
    );

    // If a valid coupon is found, apply the discount
    if (userCoupon) {
      total += Number(item.price) - userCoupon.discountAmount; // Adjust the discount logic as per your coupon structure
    } else {
      total += Number(item.price);
    }

    return total;
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/${activeStoreId}/checkout`,
      {
        productIds: items.map((item) => item.id),
        // add the coupon id to the request
        discount: toggleApplyCoupon
          ? totalPrice - userCoupons[0]?.value
          : totalPrice,
      }
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
        <div className="border-gray-200 border-t pt-4">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-medium text-gray-900">
              Avaliable Cupons
            </h2>
            {/* 
              show the checkbox only if the user has a coupon and cupon is not used and cupon value is less than total price

            */}
            {userCoupons?.length > 0 &&
              user?.userData?.cupons[0]?.used !== true &&
              userCoupons[0]?.value < totalPrice && (
                <input
                  // style checkbox make it as switch
                  id="red-checkbox"
                  type="checkbox"
                  value={toggleApplyCoupon}
                  className="w-4 h-4 accent-pink-500"
                  onChange={() => setToggleApplyCoupon(!toggleApplyCoupon)}
                />
              )}
          </div>
          <br />
          {userCoupons?.length > 0 &&
            user?.userData?.cupons[0]?.used !== true &&
            userCoupons[0]?.value < totalPrice && (
              <div>
                {userCoupons?.map((coupon: any) => (
                  <div
                    key={coupon.id}
                    className="flex items-center justify-between "
                  >
                    <div className="text-base font-medium text-green-700">
                      {coupon.name}
                    </div>
                    <Currency value={coupon.value} className="text-green-700" />
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
      <div className="border-gray-200 border-t pt-4">
        <h2>Total Price: </h2>
        <Currency
          className={`
            ${toggleApplyCoupon ? "text-green-700" : "text-black font-bold"}
          
          `}
          value={
            toggleApplyCoupon ? totalPrice - userCoupons[0]?.value : totalPrice
          }
        />
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
