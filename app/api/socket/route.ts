import { WebSocketServer } from "ws";
import { NextResponse } from "next/server";

let wss: WebSocketServer | null = null;

export async function GET() {
  // Initialize WebSocket server only if it's not already started
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    // Set up WebSocket connection handler
    wss.on("connection", (ws) => {
      console.log("Client connected");

      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });

    console.log("WebSocket server started");
  }

  return NextResponse.json({ message: "WebSocket server initialized" });
}

// Function to notify clients
export function notifyClients() {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ message: "Data updated" }));
      }
    });
  }
}
