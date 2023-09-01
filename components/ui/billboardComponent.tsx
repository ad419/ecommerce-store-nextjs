"use client";
import { Billboard as BillboardType } from "@/types";
import { useEffect, useState } from "react";

interface BillboardProps {
  data: BillboardType;
}

const BillboardComponent: React.FC<BillboardProps> = ({ data }) => {
  const [textColor, setTextColor] = useState<string>("white"); // Default text color

  useEffect(() => {
    // Function to calculate the average color of an image
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
        if (brightness > 128) {
          setTextColor("black"); // Use black text for light backgrounds
        } else {
          setTextColor("white"); // Use white text for dark backgrounds
        }
      };
    };

    const image = new Image();
    image.src = data?.imageUrl || "";

    // Ensure the image is loaded before calculating the average color
    image.onload = () => {
      getAverageColor(image);
    };
  }, [data?.imageUrl]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
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
    </div>
  );
};

export default BillboardComponent;
