import { CamsExample, reverseGeocode } from "@/app/data/data";
import { format } from "date-fns";

export default async function CameraPage({ params }: any) {
  //   const specificCam = await getOneCam(Number(params.cameraId));
  const camID = Number(params.cameraId);
  const camera = CamsExample.find((camera) => camera.cam_id === camID);
  const lat = camera?.location.latitude;
  const long = camera?.location.longitude;
  const location = await reverseGeocode(lat ?? 0, long ?? 0);
  const lpDate = camera?.last_ping;
  const lastPingDate = new Date(lpDate ?? 0);
  const formattedDate = format(lastPingDate, "MMM d, yyyy, h:mm a");
  return (
    <>
      <div className="mx-4 md:mx-32 mt-4">
        {/* <div>We are in {location}!</div> */}

        <div className="flex gap-8 flex-wrap">
          <div id="video and news" className="flex flex-col grow max-w-[50rem]">
            <div className="mt-5 mb-4 font-bold text-2xl">
              Camera {params.cameraId}
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-500"></div>
            {/* Aspect ratio 16:9 */}
            <div className="text-3xl mt-4 max-w-[45rem]">{location}</div>
          </div>

          <div className="bg-gray-300 flex-grow min-w-[20rem] font-bold text-2xl text-center">
            News
          </div>
        </div>
      </div>
    </>
  );
}
