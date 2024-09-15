// components/MapComponent.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CamsExample } from "@/app/data/data";
import Image from "next/image";
import Link from "next/link";

const MapComponent: React.FC = () => {
  return (
    <MapContainer
      center={[42.360092, -71.094162]}
      zoom={4}
      style={{ height: "70vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {CamsExample.map((cam) => (
        <>
          {cam.highlight ? (
            <Marker
              key={cam.cam_id}
              position={[cam.location.latitude, cam.location.longitude]}
              icon={L.icon({
                iconUrl: "/mappin_alert.png",
                iconSize: [64, 64], // Set your desired icon size here
                className: "relative",
              })}
            >
              {/* Ping animation */}

              {/* <Image
                src="/mappin_alert.png"
                height={200}
                width={200}
                alt="logo"
                className="absolute h-10 w-10 animate-ping rounded-full bg-red-400 opacity-75"
              /> */}

              <Popup className="red-popup">
                <div className="flex flex-col gap-1">
                  <div className="underline font-bold">
                    ABNORMAL ACTIVITY DETECTED
                  </div>
                  <div>
                    <span className="font-bold">Camera ID:</span> {cam.cam_id}
                  </div>
                  <div>
                    <span className="font-bold">Last Updated:</span>{" "}
                    {new Date(cam.last_ping).toLocaleString()}
                  </div>
                  <div className="font-bold">
                    <Link href={`/cameras/${cam.cam_id}`} className="underline">
                      View feed
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : (
            <Marker
              key={cam.cam_id}
              position={[cam.location.latitude, cam.location.longitude]}
              icon={L.icon({
                iconUrl: "/mappin.png",
                iconSize: [64, 64],
              })}
            >
              <Popup className="custom-popup">
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="font-bold">Camera ID:</span> {cam.cam_id}
                  </div>
                  <div>
                    <span className="font-bold">Last Updated:</span>{" "}
                    {new Date(cam.last_ping).toLocaleString()}
                  </div>
                  <div>
                    <Link href={`/cameras/${cam.cam_id}`} className="underline">
                      View feed
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
