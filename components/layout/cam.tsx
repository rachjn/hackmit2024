"use client";
import { CamsExample, reverseGeocode } from "@/app/data/data";
import { useEffect, useState } from "react";
import CameraTab from "./camtab";
import Link from "next/link";
import { format } from "date-fns";
import { listCameras } from "@/convex/myFunctions";
import { preloadQuery } from "convex/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CameraTabs() {
  //   const cameraData = CamsExample; // TODO: turn into get function
  //   const args = {};
  const args = {};

  const cameraData = useQuery(api.myFunctions.listCameras, {});
  console.log(cameraData);
  //   const dataStreams = useQuery(api.myFunctions.getDataStreams, args);

  return (
    <>
      {JSON.stringify(cameraData)}
      {/* {JSON.stringify(dataStreams)} */}
      {cameraData?.map((camera) => {
        const lat = camera.location.latitude;
        const long = camera.location.longitude;
        const lastPingDate = new Date(camera.last_ping);
        const formattedDate = format(lastPingDate, "MMM d, yyyy, h:mm a");

        return (
          <>
            <Link href={`/cameras/${camera.cam_id}`} className="text-white">
              <CameraTab lat={lat} long={long} lp={formattedDate} />
            </Link>
          </>
        );
      })}
    </>
  );
}
