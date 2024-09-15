import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import MapComponent from "./map";
import { DataStreamExample } from "@/app/data/data";

export default async function MapDataWrapper() {
  // Preload the data from Convex using your getDataStreams query
  //   const preloadedData = await preloadQuery(api.myFunctions.getDataStreams, {});
  const preloadedCams = await preloadQuery(api.myFunctions.listCameras, {});

  // Pass the preloaded data as a prop to the MapData component
  return (
    <MapComponent
      preloadedCams={preloadedCams}
      preloadedData={DataStreamExample}
    />
  );
}
