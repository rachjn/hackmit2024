"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { getDataStreams } from "@/app/data/data";
import NewsBox from "./newsbox";

export default function StreamUpdater() {
  const [dataStream, setDataStream] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    // Fetch the initial data streams
    const fetchData = async () => {
      try {
        const initialData = await getDataStreams({
          somePayload: "your-payload",
        });
        if (isMounted) {
          setDataStream(initialData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Initialize Pusher client
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    // Subscribe to the 'data-updates' channel
    const channel = pusher.subscribe("data-updates");

    // Listen for 'new-update' event
    channel.bind("new-update", async (data: any) => {
      console.log("Pusher event received:", data);

      try {
        const updatedData = await getDataStreams({});
        if (isMounted) {
          setDataStream(updatedData);
        }
      } catch (error) {
        console.error("Error fetching updated data streams:", error);
      }
    });

    return () => {
      // Cleanup on unmount
      isMounted = false; // Prevent state updates if unmounted
      channel.unbind_all(); // Unbind all events
      channel.unsubscribe(); // Unsubscribe from the channel
      pusher.disconnect(); // Disconnect the Pusher client
    };
  }, []);

  return (
    <div>
      {dataStream.map((alert: any) => (
        <div key={alert._id}>
          <NewsBox alert={alert} />
        </div>
      ))}
    </div>
  );
}
