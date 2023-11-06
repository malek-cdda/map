"use client";
import Script from "next/script";
import { useEffect } from "react";
import { markerCustom } from "./markerFunction";
import { infoWindowDeclare, mapDeclare } from "../mapFunction/map";

const Marker = ({ apiKey, marker = false }: any) => {
  useEffect(() => {
    async function initMap() {
      const { AdvancedMarkerElement, PinElement, map } = await mapDeclare("");
      const { infoWindow } = await infoWindowDeclare(map);
      marker &&
        markerCustom(AdvancedMarkerElement, map, PinElement, infoWindow);
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [marker]);

  return (
    <div>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs&callback=initMap&libraries=places&v=weekly"
        defer
      ></Script>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>
      <div id="map" className="h-[500px]"></div>
      <div id="pano" className="h-[300px] w-full"></div>
    </div>
  );
};

export default Marker;
