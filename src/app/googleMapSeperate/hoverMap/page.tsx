"use client";
import {
  address,
  mapCenter,
  properties,
  typeValue,
} from "@/components/googleType";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
declare global {
  interface Window {
    initMap: () => void;
  }
}

function Home() {
  async function initMap() {}

  const router = useRouter();
  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      window.initMap = initMap;
      initMap();
    }
  }, [router]);
  return (
    <div id="ma " className="relative">
      <div className="pac-card" id="pac-card">
        <div id="title">Adress Search</div>
        <div id="type-selector" className="pac-controls"></div>

        <div id="pac-container relative" className="border relative">
          <input
            id="pac-input"
            type="text"
            placeholder="Enter a location"
            className="px-5 py-5 "
          />
          <span className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2">
            {" "}
            {">"}{" "}
          </span>
        </div>
      </div>
      <div id="map"></div>
    </div>
  );
}

export default Home;
