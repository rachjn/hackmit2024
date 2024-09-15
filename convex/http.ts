import { httpRouter } from "convex/server";
import { upsertDataStreamHttp, upsertCameraHttp, getDataStreamsHttp, listCamerasHttp } from "./cams";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

http.route({
  path: "/upsertDataStream",
  method: "POST",
  handler: upsertDataStreamHttp,
});

http.route({
  path: "/upsertDataStream",
  method: "OPTIONS",
  handler: upsertDataStreamHttp,
});

http.route({
    path: "/upsertCamera",
    method: "POST",
    handler: upsertCameraHttp,
  });

  http.route({
    path: "/upsertCamera",
    method: "OPTIONS",
    handler: upsertCameraHttp,
  });

http.route({
    path: "/getDataStreams",
    method: "POST",
    handler: getDataStreamsHttp,
});

http.route({
  path: "/getDataStreams",
  method: "OPTIONS",
  handler: getDataStreamsHttp,
});

http.route({
    path: "/listCameras",
    method: "POST",
    handler: listCamerasHttp,
});

http.route({
  path: "/listCameras",
  method: "OPTIONS",
  handler: listCamerasHttp,
});


http.route({
    path: "/sendImage",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
      // Step 1: Store the file
      const blob = await request.blob();
      const storageId = await ctx.storage.store(blob);

      // Step 3: Return a response with the correct CORS headers
      return new Response(null, {
        status: 200,
        // CORS headers
        headers: new Headers({
          // e.g. https://mywebsite.com, configured on your Convex dashboard
          "Access-Control-Allow-Origin": "*",
          Vary: "origin",
        }),
      });
    }),
  });

  http.route({
    path: "/sendImage",
    method: "OPTIONS",
    handler: httpAction(async (_, request) => {
      // Make sure the necessary headers are present
      // for this to be a valid pre-flight request
      const headers = request.headers;
      if (
        headers.get("Origin") !== null &&
        headers.get("Access-Control-Request-Method") !== null &&
        headers.get("Access-Control-Request-Headers") !== null
      ) {
        return new Response(null, {
          headers: new Headers({
            // e.g. https://mywebsite.com, configured on your Convex dashboard
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Digest",
            "Access-Control-Max-Age": "86400",
          }),
        });
      } else {
        return new Response();
      }
    }),
  });

// Convex expects the router to be the default export of `convex/http.js`.
export default http;