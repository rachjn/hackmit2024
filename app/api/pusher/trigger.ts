import Pusher from "pusher";
import { NextResponse } from "next/server";

// Initialize Pusher with your credentials
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true, // Enable TLS (important for production environments)
});

// Trigger a Pusher event when data updates
export async function POST(request: Request) {
  const body = await request.json();

  try {
    // Trigger an event on a specific channel and event name
    await pusher.trigger("data-updates", "new-update", {
      message: body.message || "New data stream available!",
    });

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Error triggering Pusher event:", error);
    return NextResponse.json(
      { error: "Failed to trigger event" },
      { status: 500 }
    );
  }
}
