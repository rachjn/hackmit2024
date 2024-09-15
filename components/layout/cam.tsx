import { CamsExample, reverseGeocode } from "@/app/data/data";
import { useState } from "react";
import CameraTab from "./camtab";
import Link from "next/link";
import { format } from "date-fns";

export default async function CameraTabs() {
  const cameraData = CamsExample; // TODO: turn into get function
  return (
    <>
      {cameraData.map((camera) => {
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
