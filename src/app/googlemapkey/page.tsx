"use client";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Page() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = (await loader.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      const position = { lat: 47.8864, lng: 106.9057 };

      const map = new Map(mapRef.current as HTMLDivElement, {
        center: position,
        zoom: 17,
      });
    };

    initMap();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div ref={mapRef} className="w-[400px] h-[600px]" />;
    </div>
  );
}

export default Page;
