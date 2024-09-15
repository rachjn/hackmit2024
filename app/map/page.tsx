import RotatingText from "@/components/layout/fliptext";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";

export default async function MapPage() {
  const preloadedCams = await preloadQuery(api.myFunctions.listCameras, {});
  //   const preloadedData = await preloadQuery(api.myFunctions.getDataStreams, {});
  return (
    <>
      <div className="mt-5">
        <div className="text-center mb-10 font-bold text-2xl">
          What are wildlife around the world up to?
        </div>
        <div className="relative">
          {/* <MapComponent cams={cams} data={data} /> */}
          <div className="mt-4 text-center">
            <RotatingText />
          </div>
        </div>
      </div>
    </>
  );
}
