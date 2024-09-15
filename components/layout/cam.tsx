import { Preloaded, usePreloadedQuery } from "convex/react";

import { CamsExample, listCameras, reverseGeocode } from "@/app/data/data";
import { useEffect, useState } from "react";
import CameraTab from "./camtab";
import Link from "next/link";
import { format } from "date-fns";
// import { listCameras } from "@/convex/myFunctions";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { preloadQuery } from "convex/nextjs";

export default async function CameraTabs() {
  //   const cameraData = CamsExample; // TODO: turn into get function
  //   const args = {};
  //   const args = {};
  //   //   const cameraData = usePreloadedQuery(props.preloadedCams);
  //   const [cameraData, setCameraData] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState<string | null>(null);
  const cameraData = await listCameras({});

  //   useEffect(() => {
  //     const fetchCameraData = async () => {
  //       try {
  //         const data = await listCameras({});
  //         setCameraData(data);
  //       } catch (err) {
  //         // Type guard to ensure `err` is an `Error`
  //         if (err instanceof Error) {
  //           setError(err.message);
  //         } else {
  //           setError("An unknown error occurred.");
  //         }
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchCameraData();
  //   }, []); // Empty dependency array means this runs once on mount

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error}</div>;

  //   const cameraData = useQuery(api.myFunctions.listCameras, {});
  //   const dataStreams = useQuery(api.myFunctions.getDataStreams, args);

  //   console.log(cameraData);
  return (
    <>
      {cameraData.map((camera: any) => {
        const lat = camera.location.latitude;
        const long = camera.location.longitude;
        const lastPingDate = new Date(camera.last_ping);
        const formattedDate = format(lastPingDate, "MMM d, yyyy, h:mm a");

        return (
          <Link
            key={camera.cam_id}
            href={`/cameras/${camera.cam_id}`}
            className="text-white"
          >
            <CameraTab lat={lat} long={long} lp={formattedDate} />
          </Link>
        );
      })}
    </>
  );
}
