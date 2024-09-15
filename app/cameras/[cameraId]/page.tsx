import {
  CamsExample,
  DataStreamExample,
  getDataStreams,
  listCameras,
  reverseGeocode,
} from "@/app/data/data";
import NewsBox from "@/components/layout/newsbox";
import { format } from "date-fns";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import VideoPlayer from "@/components/layout/videoplayer";
import Video from "next-video";
import getStarted from "/videos/get-started.mp4";
// import 01 from "/videos/01.mp4";

export default async function CameraPage({ params }: any) {
  //   const specificCam = await getOneCam(Number(params.cameraId));
  const camID = Number(params.cameraId);
  const cams = await listCameras({});
  const camera = cams.find((camera: any) => camera.cam_id === camID);
  const lat = camera?.location.latitude;
  const long = camera?.location.longitude;
  const location = await reverseGeocode(lat ?? 0, long ?? 0);
  const lpDate = camera?.last_ping;
  const lastPingDate = new Date(lpDate ?? 0);
  const formattedDate = format(lastPingDate, "MMM d, yyyy, h:mm a");
  const dataStream = await getDataStreams({
    cam_id: camID,
  });
  //   const filteredStreams = dataStream.filter(
  //     (stream: any) => stream.cam_id === camID
  //   );
  const videoUrl = "/01.mp4";

  return (
    <>
      <div className="mx-4 md:mx-32 mt-4">
        {/* <div>We are in {location}!</div> */}

        <div className="flex gap-8 flex-wrap">
          <div id="video and news" className="flex flex-col grow max-w-[50rem]">
            <div className="mt-5 mb-4 font-bold text-2xl flex justify-between items-end">
              Camera {params.cameraId}
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-500"></div>
            {/* <VideoPlayer videoUrl={videoUrl} /> */}
            {/* <Video src={getStarted} /> */}
            {/* Aspect ratio 16:9 */}
            <div className="text-3xl mt-4 max-w-[45rem]">{location}</div>
            <div className="text-sm mt-3">
              <span className="font-bold">Last Updated: </span>
              {formattedDate}
            </div>
          </div>

          <div className="min-w-[20rem] grow ">
            <div className="font-bold text-2xl text-center my-4">News</div>

            <div className="mx-4 flex flex-col gap-2">
              {dataStream.map((alert: any) => (
                <div key={alert._id}>
                  <NewsBox alert={alert} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
