"use client";
import { Billboard as BillboardType, Cupon } from "@/types";
import { useEffect, useState } from "react";
import { BiGift } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { motion } from "framer-motion";
import moment from "moment";
import useCupon from "@/hooks/use-cupon";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import claimCuponDb from "@/actions/claim-cupon";
import getUser from "@/actions/get-user";

interface BillboardProps {
  data: BillboardType;
  cupons: Cupon[];
}

const BillboardComponent: React.FC<BillboardProps> = ({ data, cupons }) => {
  const [textColor, setTextColor] = useState<string>("white"); // Default text color
  const [countdown, setCountdown] = useState<number>(0) as any;
  const [cuponModal, setCuponModal] = useState<boolean>(false);
  const { data: session } = useSession() as any;
  const claimCupon = useCupon();
  const userSesion = session?.user;
  useEffect(() => {
    const getAverageColor = (img: HTMLImageElement) => {
      img.setAttribute("crossOrigin", "anonymous");
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      // Ensure the image is loaded before calculating the average color
      img.onload = () => {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

        let totalR = 0;
        let totalG = 0;
        let totalB = 0;
        let count = 0;

        for (let i = 0; i < imageData.length; i += 4) {
          totalR += imageData[i];
          totalG += imageData[i + 1];
          totalB += imageData[i + 2];
          count++;
        }

        const avgR = Math.round(totalR / count);
        const avgG = Math.round(totalG / count);
        const avgB = Math.round(totalB / count);

        // Calculate the brightness of the average color
        const brightness = (avgR * 299 + avgG * 587 + avgB * 114) / 1000;

        // Set the text color based on brightness
        if (brightness > 50) {
          setTextColor("black"); // Use black text for light backgrounds
        } else {
          setTextColor("white"); // Use white text for dark backgrounds
        }
      };
    };

    const image = new Image();
    image.src = data?.imageUrl || "";
    image.onload = () => {
      getAverageColor(image);
    };
  }, [data?.imageUrl]);
  // sync cupons claimed by the user with db
  useEffect(() => {
    const syncCupons = async () => {
      // delay fetching the user data to make sure the user is logged in
      if (!session) return;
      const user = JSON.parse(
        await getUser(session?.user?.id as string)
      ) as any;
      const userCoupons = user?.userData.cupons
        .map((userCupon: any) => {
          return cupons.find((cupon) => cupon.id === userCupon.cuponId);
        })
        .filter(Boolean);
      claimCupon.syncItems(userCoupons);
    };

    syncCupons();
  }, [session]);
  // get the cupon randomly from the cupons array

  const cupon = cupons[Math.floor(Math.random() * cupons.length)];

  async function handleClaimCupon() {
    // if user is not logged in dont claim the cupon
    if (!session) return toast.error("You need to login to claim the cupon");
    const res = (await claimCuponDb(session?.user?.id, cupon?.id)) as any;
    const { message, status } = JSON.parse(res);
    if (status === 200) {
      toast.success(message);
      claimCupon.addItem(cupon);
    }
  }
  const clientCupon = claimCupon.items.filter(
    (item) => item.id === cupon?.id
  )[0];
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiresAt = new Date(cupon?.expiresAt);
      const diff = expiresAt?.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${days} : ${hours} : ${minutes} : ${seconds}`);
    }, 1000);

    // if countdown is 0, clear the interval

    if (countdown === "0 : 0 : 0 : 0") {
      clearInterval(interval);
    }

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [cupons]); // Include 'cupons' as a dependency
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="rounded-xl aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover relative"
      >
        {session && (
          <div>
            {clientCupon ? (
              <div className="absolute bg-red-500 z-50 right-0 top-0 text-white w-[200px] text-muted text-sm flex items-center p-2 cursor-pointer">
                <h1 className="text-sm font-bold text-white">
                  You have claimed this cupon
                </h1>
              </div>
            ) : (
              <div
                onClick={() => setCuponModal(!cuponModal)}
                className="absolute bg-red-500 z-50 right-0 top-0 text-white w-[350px] text-lg flex items-center gap-4 p-3 cursor-pointer"
              >
                {cupon?.name}
                <div>{countdown}</div>
              </div>
            )}
          </div>
        )}
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div
            style={{
              color: textColor,
            }}
            className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs"
          >
            {data?.label}
          </div>
        </div>
      </div>
      {cuponModal && (
        <div
          onClick={() => setCuponModal(!cuponModal)}
          className="fixed top-0 left-0 z-50 h-screen w-screen bg-slate-900 bg-opacity-80 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl"
          >
            <div className="text-2xl font-bold bg-red-500 w-full p-4 text-white">
              {cupon?.name}
            </div>
            <br />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              // shake animation when hover
              whileHover={{
                scale: 1.1,
                // shake animation when hover
                rotate: [0, 10, -10, 0, 10, -10, 0],
              }}
              onClick={handleClaimCupon}
            >
              {clientCupon ? (
                <div className="flex items-center justify-center gap-4 cursor-pointer">
                  <AiOutlineCheck className="text-green-500" size={50} />
                  <div className="text-2xl font-bold text-red-500">Claimed</div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-4 cursor-pointer">
                  <BiGift className="text-red-500 text-9xl" />
                  <div className="text-2xl font-bold text-red-500">Claim</div>
                </div>
              )}
            </motion.div>
            <div className="p-5">
              <div className="text-lg">Cupon Pize: {cupon?.value} $</div>
              <div className="text-lg">
                Avaliable until:{" "}
                {moment.utc(cupon?.expiresAt).local().format("DD/MM/YYYY")}
              </div>
              <div className="text-lg">
                {/* Total Claims: {cupon?.claimedById.length} */}
              </div>
              <div className="text-lg">
                Status: {cupon?.activated ? "Activated" : "Not Activated"}
              </div>
              <div className="text-lg">Store ID: {cupon?.storeId}</div>
            </div>

            <p className="opacity-50 text-gray-800 text-sm p-4">
              Note: Click the gift to claim the cupon. You can only claim the
              cupon once.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillboardComponent;
