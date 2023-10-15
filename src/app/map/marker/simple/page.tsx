"use client";
import { markerData } from "@/components/marker/data";

import React, { useEffect, useState } from "react";
// declare map types
let map: google.maps.Map;

const Home = () => {
  const [toggle, setToggle] = useState(true);
  async function initMap() {
    // decalre map library
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    // marker advance import from google marker library
    const { AdvancedMarkerElement, PinElement } =
      (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 34.8559195, lng: -111.7988186 },
      zoom: 8,
      mapId: "googlemapid",
    });
    // marker declare
    markerCustom(AdvancedMarkerElement, map, toggle, PinElement);
  }
  async function markerCustom(
    params: any,
    map: any,
    toggle: any,
    PinElement: any
  ) {
    const infoWindow = new google.maps.InfoWindow({});
    markerData.forEach(({ position, price, title }) => {
      let t = 324;
      const priceTag = document.createElement("div");
      priceTag.className =
        "bg-red-800 w-15 h-5 pt-1 rounded-full px-4 text-white";
      priceTag.textContent = price;
      const pinScaled = new PinElement({
        scale: 1.5,
        glyph: `${t}`,
        glyphColor: "green",
        background: "yellow",
      });
      const marker = new params({
        map,
        position,
        content: toggle ? pinScaled?.element : priceTag,
      });
      //   infoWindow.open(map, marker);
    });
  }
  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [toggle]);
  return (
    <div>
      <div id="map" className="h-[500px]"></div>
      <div className="fixed bottom-3 right-4">
        <button
          onClick={() => setToggle(true)}
          className="mx-5 bg-red-700 px-3 py-2 rounded-md"
        >
          default
        </button>
        <button
          onClick={() => setToggle(false)}
          className="mx-5 bg-red-700 px-3 py-2 rounded-md"
        >
          custom
        </button>
      </div>
    </div>
  );
};

export default Home;
