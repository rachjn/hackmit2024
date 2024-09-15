import { reverseGeocode } from "@/app/data/data";
import { useState } from "react";
import { LuMapPin } from "react-icons/lu";

interface CamInfo {
  lat: number;
  long: number;
  lp: string;
}

export default async function CameraTab({ lat, long, lp }: CamInfo) {
  const result = await reverseGeocode(lat, long); // Example: MIT, Cambridge, MA coordinates
  return (
    <>
      <div className="mx-12 my-4 p-6 rounded-lg bg-dark-green bg-opacity-90">
        <div className="flex items-center gap-2">
          <LuMapPin />
          {result}
        </div>
        <div className="mt-2 text-sm text-light-beige">Last Updated: {lp}</div>
      </div>
    </>
  );
}
