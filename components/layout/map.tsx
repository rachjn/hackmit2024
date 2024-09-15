"use client";
// components/MapComponent.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CamsExample, getDataStreams, listCameras } from "@/app/data/data";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// get data somehow

interface Location {
  latitude: number;
  longitude: number;
}

interface Camera {
  cam_id: number;
  location: Location;
  last_ping: number;
  highlight: boolean;
}

interface DataStream {
  _id: string;
  cam_id: number;
  alert_type: string;
  animal: string;
  num_animal: number;
  ping_time: number;
}

interface MapComponentProps {
  cams: Camera[];
  data: DataStream[];
}

const MapComponent: React.FC<MapComponentProps> = ({ cams, data }) => {
  //   const [data, setData] = useState<any>(null);
  //   const [cams, setCams] = useState<any>(null);
  //   const [dataError, setDataError] = useState<string | null>(null);
  //   const [camsError, setCamsError] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         // Fetch data streams
  //         const dataResult = await getDataStreams({});
  //         setData(dataResult);
  //         console.log("Data Streams Result:", dataResult);
  //       } catch (error) {
  //         setDataError("Failed to fetch data streams");
  //         console.error("Error fetching data streams:", error);
  //       }

  //       try {
  //         // Fetch camera list
  //         const camsResult = await listCameras({});
  //         setCams(camsResult);
  //         console.log("Cameras Result:", camsResult);
  //       } catch (error) {
  //         setCamsError("Failed to fetch cameras");
  //         console.error("Error fetching cameras:", error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  //   console.log(cams);
  //   console.log(data);

  return (
    // <>{JSON.stringify(cams)}</>
    <>
      {/* {JSON.stringify(cams)} */}
      <MapContainer
        center={[42.360092, -71.094162]}
        zoom={4}
        style={{ height: "70vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cams.map((cam: any) => {
          const camID = cam.cam_id;
          const camData = data.filter((stream: any) => stream.cam_id === camID);
          const highlight = camData.some(
            (stream: any) => stream.alert_type !== ""
          );
          return (
            <>
              {highlight ? (
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
                        <span className="font-bold">Camera ID:</span>{" "}
                        {cam.cam_id}
                      </div>
                      <div>
                        <span className="font-bold">Last Updated:</span>{" "}
                        {new Date(cam.last_ping).toLocaleString()}
                      </div>
                      <div className="font-bold">
                        <Link
                          href={`/cameras/${cam.cam_id}`}
                          className="underline"
                        >
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
                        <span className="font-bold">Camera ID:</span>{" "}
                        {cam.cam_id}
                      </div>
                      <div>
                        <span className="font-bold">Last Updated:</span>{" "}
                        {new Date(cam.last_ping).toLocaleString()}
                      </div>
                      <div>
                        <Link
                          href={`/cameras/${cam.cam_id}`}
                          className="underline"
                        >
                          View feed
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )}
            </>
          );
        })}
      </MapContainer>
    </>
  );
};

export default MapComponent;
