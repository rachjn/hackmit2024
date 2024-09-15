import { v } from "convex/values";
import { query, mutation, action, internalMutation, internalQuery } from "./_generated/server";
import { api } from "./_generated/api";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

export const upsertDataStream = internalMutation({
  // Validators for arguments.
  args: {
    cam_id: v.float64(), // Camera ID (required).
    alert_type: v.string(), // The type of alert (required).
    animal: v.string(), // What animal (required).
    num_animal: v.float64(), // How many of said animal
    ping_time: v.float64(), // Time of the ping (required).
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    const { cam_id, alert_type, animal, num_animal, ping_time } = args;

    // Check if a data stream for the camera with the same ping_time already exists.
    const existingStream = await ctx.db
      .query("data_streams")
      .filter((q) => {
        // console.log(q.eq(q.field("ping_time"), ping_time).toString());
        return q.and(
          q.eq(q.field("cam_id"), cam_id),
          q.eq(q.field("ping_time"), ping_time),
          q.eq(q.field("animal"), animal)
        );
      })
      .first(); // Get the first matching stream where both cam_id and ping_time match.

    console.log(existingStream?.ping_time);

    console.log(ping_time);

    if (existingStream) {
      // If the stream with the same cam_id and ping_time exists, update it.
      await ctx.db.patch(existingStream._id, {
        alert_type,
        num_animal,
      });
      return { message: "Data stream updated successfully." };
    } else {
      // If no stream exists for this cam_id and ping_time, insert a new record.
      const id = await ctx.db.insert("data_streams", {
        cam_id,
        alert_type,
        animal,
        num_animal,
        ping_time,
      });
      return { message: "Data stream inserted successfully.", id };
    }
  },
});

// Query to get data streams for a specific camera with various filters.
export const getDataStreams = internalQuery({
  // Validators for arguments.
  args: {
    cam_id: v.optional(v.float64()), // Optional camera ID.
    minPingTime: v.optional(v.float64()), // Optional minimum ping time.
    maxPingTime: v.optional(v.float64()), // Optional maximum ping time.
    alert_type: v.optional(v.string()), // Optional alert type.
    num_animals: v.optional(v.float64()), // Optional filter by number of animals present.
    present_animals: v.optional(v.array(v.string())), // Optional list of animals to check if they are present.
  },

  // Query implementation.
  handler: async (ctx, args) => {
    let query = ctx.db.query("data_streams");

    // Filter by camera ID if provided.
    if (args.cam_id !== undefined) {
      query = query.filter((q) => q.eq(q.field("cam_id"), args.cam_id));
    }

    // Filter by minimum ping time if provided.
    if (args.minPingTime !== undefined) {
      query = query.filter((q) =>
        q.gt(q.field("ping_time"), args.minPingTime as number)
      );
    }

    // Filter by maximum ping time if provided.
    if (args.maxPingTime !== undefined) {
      query = query.filter((q) =>
        q.lt(q.field("ping_time"), args.maxPingTime as number)
      );
    }

    // Filter by alert type if provided.
    if (args.alert_type !== undefined) {
      query = query.filter((q) => q.eq(q.field("alert_type"), args.alert_type));
    }

    // Filter by number of animals present if provided.
    if (args.num_animals !== undefined) {
      query = query.filter((q) => {
        const animalCount = q.field("num_animal");
        return q.gte(animalCount, args.num_animals as number);
      });
    }

    // Filter by specific animals being present (non-zero) if provided.
    if (args.present_animals !== undefined && args.present_animals.length > 0) {
      query = query.filter((q) =>
        (args.present_animals as string[]).includes(
          q.field("animal").toString()
        )
      );
    }

    // Execute the query and return the data streams.
    const dataStreams = await query.collect();
    return dataStreams.map((stream) => ({
      cam_id: stream.cam_id,
      alert_type: stream.alert_type,
      animal: stream.animal,
      num_animal: stream.num_animal,
      ping_time: stream.ping_time,
    }));
  },
});

// Mutation to either insert or update a camera record.
export const upsertCamera = internalMutation({
  // Validators for arguments.
  args: {
    cam_id: v.float64(), // Camera ID (required).
    last_ping: v.float64(), // Last ping time (required).
    location: v.object({
      latitude: v.float64(), // Latitude of the camera.
      longitude: v.float64(), // Longitude of the camera.
    }),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    // Check if the camera with the given cam_id already exists.
    const existingCamera = await ctx.db
      .query("cameras")
      .filter((q) => q.eq(q.field("cam_id"), args.cam_id))
      .first(); // Get the first matching record.

    if (existingCamera) {
      // If the camera exists, update it.
      await ctx.db.patch(existingCamera._id, {
        last_ping: args.last_ping,
        location: {
          latitude: args.location.latitude,
          longitude: args.location.longitude,
        },
      });
      return { message: "Camera updated successfully." };
    } else {
      // If the camera does not exist, insert a new record.
      const id = await ctx.db.insert("cameras", {
        cam_id: args.cam_id,
        last_ping: args.last_ping,
        location: {
          latitude: args.location.latitude,
          longitude: args.location.longitude,
        },
      });
      return { message: "Camera inserted successfully.", id };
    }
  },
});

export const listCameras = internalQuery({
  // Validators for arguments.
  args: {
    cam_id: v.optional(v.float64()), // Optional camera ID for exact match.
    minPingAge: v.optional(v.float64()), // Optional minimum ping age (in seconds).
    maxPingAge: v.optional(v.float64()), // Optional maximum ping age (in seconds).
  },

  // Query implementation.
  handler: async (ctx, args) => {
    let query = ctx.db.query("cameras");

    // Filter by exact camera ID if provided.
    if (args.cam_id !== undefined) {
      query = query.filter((q) => q.eq(q.field("cam_id"), args.cam_id));
    }

    // Get current time in seconds.
    const currentTime = Date.now() / 1000;

    // Filter by minimum ping age if provided.
    if (args.minPingAge !== undefined) {
      const minPingTime = currentTime - args.minPingAge;
      query = query.filter((q) => q.gt(q.field("last_ping"), minPingTime));
    }

    // Filter by maximum ping age if provided.
    if (args.maxPingAge !== undefined) {
      const maxPingTime = currentTime - args.maxPingAge;
      query = query.filter((q) => q.lt(q.field("last_ping"), maxPingTime));
    }

    // Execute the query and return the list of cameras.
    const cameras = await query.collect();
    return cameras.map((camera) => ({
      cam_id: camera.cam_id,
      last_ping: camera.last_ping,
      location: camera.location,
    }));
  },
});

// You can read data from the database via a query:
// export const listNumbers = query({
//   // Validators for arguments.
//   args: {
//     count: v.number(),
//   },

//   // Query implementation.
//   handler: async (ctx, args) => {
//     //// Read the database as many times as you need here.
//     //// See https://docs.convex.dev/database/reading-data.
//     const numbers = await ctx.db
//       .query("numbers")
//       // Ordered by _creationTime, return most recent
//       .order("desc")
//       .take(args.count);
//     return {
//       viewer: (await ctx.auth.getUserIdentity())?.name ?? null,
//       numbers: numbers.toReversed().map((number) => number.value),
//     };
//   },
// });

// You can write data to the database via a mutation:
export const addNumber = mutation({
  // Validators for arguments.
  args: {
    value: v.number(),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    //// Insert or modify documents in the database here.
    //// Mutations can also read from the database like queries.
    //// See https://docs.convex.dev/database/writing-data.

    const id = await ctx.db.insert("numbers", { value: args.value });

    console.log("Added new document with id:", id);
    // Optionally, return a value from your mutation.
    // return id;
  },
});

// You can fetch data from and send data to third-party APIs via an action:
// export const myAction = action({
//   // Validators for arguments.
//   args: {
//     first: v.number(),
//     second: v.string(),
//   },

//   // Action implementation.
//   handler: async (ctx, args) => {
//     //// Use the browser-like `fetch` API to send HTTP requests.
//     //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
//     // const response = await ctx.fetch("https://api.thirdpartyservice.com");
//     // const data = await response.json();

//     //// Query data by running Convex queries.
//     const data = await ctx.runQuery(api.myFunctions.listNumbers, {
//       count: 10,
//     });
//     console.log(data);

//     //// Write data by running Convex mutations.
//     await ctx.runMutation(api.myFunctions.addNumber, {
//       value: args.first,
//     });
//   },
// });
