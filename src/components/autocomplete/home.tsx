import Script from "next/script";
import { useEffect, useState } from "react";
import {
  infoWindowDeclare,
  mapDeclare,
  markerDeclare,
} from "../mapFunction/map";
import { autoCompleteDeclare, streetViewDeclare } from "./auto";

export const AutoComplete = ({
  apiKey = "",
  autoComplete = false,
  streetView = false,
}: any) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    async function initMap() {
      let { map } = await mapDeclare("");
      const { infoWindow } = await infoWindowDeclare(map);
      const { marker } = await markerDeclare(map);
      autoComplete && autoCompleteDeclare(marker, map, infoWindow);
      streetView && streetViewDeclare(map, infoWindow, setError);
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [streetView, autoComplete, apiKey, error]);
  console.log(error);
  return (
    <>
      <div className="relative">
        {autoComplete && (
          <input
            id="pac-input"
            className="controls   absolute top-1/2 left-1/2 transform -translate-x-1/2 z-50 w-1/2  px-2 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  "
            type="text"
            placeholder="Search Box"
          />
        )}
        <div className="h-[600px]" id="map"></div>
      </div>
      {streetView && (
        <> {error && <div id="pano" className="h-[300px] w-full"></div>}</>
      )}

      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&v=weekly`}
        defer
      ></Script>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>
    </>
  );
};
