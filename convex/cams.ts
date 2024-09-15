import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

// HTTP action to upsert data streams
export const upsertDataStreamHttp = httpAction(async (ctx, request) => {
    // Handle preflight requests
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }
  // Extract the data from the request body
  const { cam_id, alert_type, animal, num_animal, ping_time } = await request.json();

  // Call the existing `upsertDataStream` mutation
  const result = await ctx.runMutation(internal.myFunctions.upsertDataStream, {
    cam_id,
    alert_type,
    animal,
    num_animal,
    ping_time,
  });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: new Headers({
      // e.g. https://mywebsite.com, configured on your Convex dashboard
      "Access-Control-Allow-Origin": "*",
      Vary: "origin",
    }),
  });
});


// HTTP action to get data streams
export const getDataStreamsHttp = httpAction(async (ctx, request) => {
    // Handle preflight requests
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }
    // Extract the filters from the request body
    const { cam_id, minPingTime, maxPingTime, alert_type, num_animals, present_animals } = await request.json();
  
    // Call the existing `getDataStreams` query
    const dataStreams = await ctx.runQuery(internal.myFunctions.getDataStreams, {
      cam_id,
      minPingTime,
      maxPingTime,
      alert_type,
      num_animals,
      present_animals,
    });
  
    return new Response(JSON.stringify(dataStreams), {
      status: 200,
      headers: new Headers({
        // e.g. https://mywebsite.com, configured on your Convex dashboard
        "Access-Control-Allow-Origin": "*",
        Vary: "origin",
      }),
    });
  });


// HTTP action to upsert camera
export const upsertCameraHttp = httpAction(async (ctx, request) => {
    // Handle preflight requests
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }
    // Extract the data from the request body
    const { cam_id, last_ping, location } = await request.json();
  
    // Call the existing `upsertCamera` mutation
    const result = await ctx.runMutation(internal.myFunctions.upsertCamera, {
      cam_id,
      last_ping,
      location,
    });
  
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: new Headers({
        // e.g. https://mywebsite.com, configured on your Convex dashboard
        "Access-Control-Allow-Origin": "*",
        Vary: "origin",
      }),
    });
  });
// HTTP action to list cameras
export const listCamerasHttp = httpAction(async (ctx, request) => {
    // Handle preflight requests
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }
  // Extract the filters from the request body
  const { cam_id, minPingAge, maxPingAge } = await request.json();

  // Call the existing `listCameras` query
  const cameras = await ctx.runQuery(internal.myFunctions.listCameras, {
    cam_id,
    minPingAge,
    maxPingAge,
  });

  return new Response(JSON.stringify(cameras), {
    status: 200,
    headers: new Headers({
      // e.g. https://mywebsite.com, configured on your Convex dashboard
      "Access-Control-Allow-Origin": "*",
      Vary: "origin",
    }),
  });
});