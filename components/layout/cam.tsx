import { CamsExample, reverseGeocode } from "@/app/data/data";
import { useState } from "react";
import CameraTab from "./camtab";

export default async function CameraTabs() {
  const cameraData = CamsExample; // TODO: turn into get function
  return (
    <>
      {cameraData.map((camera) => {
        const lat = camera.location.latitude;
        const long = camera.location.longitude;

        return (
          <>
            <CameraTab lat={lat} long={long} />
          </>
        );
      })}
    </>
  );
}
