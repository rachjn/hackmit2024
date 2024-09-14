import CameraTabs from "@/components/layout/cam";
import { LuMapPin } from "react-icons/lu";

export default function AllCameras() {
  return (
    <>
      <div className="mx-20">
        <div className="font-bold text-5xl text-center my-12">All Cameras</div>
        <CameraTabs />
      </div>
    </>
  );
}
