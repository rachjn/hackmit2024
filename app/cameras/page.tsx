import CameraTabs from "@/components/layout/cam";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { listCameras } from "../data/data";

export default async function AllCameras() {
  // const preloadedCams = await preloadQuery(api.myFunctions.listCameras, {});
  // const cams = listCameras({});
  return (
    <>
      <div className="mx-20">
        <div className="font-bold text-5xl text-center my-12">All Cameras</div>
        <CameraTabs />
      </div>
    </>
  );
}
