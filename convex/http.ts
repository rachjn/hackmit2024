import { httpRouter } from "convex/server";
import { upsertDataStreamHttp, upsertCameraHttp } from "./cams";

const http = httpRouter();

http.route({
  path: "/upsertDataStream",
  method: "POST",
  handler: upsertDataStreamHttp,
});

http.route({
    path: "/upsertCamera",
    method: "POST",
    handler: upsertCameraHttp,
  });

// Convex expects the router to be the default export of `convex/http.js`.
export default http;