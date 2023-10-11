"use client";
import { placeFind, variableDelareMethod } from "@/components/mergeData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
//  declare global windows interface to see the display in live
declare global {
  interface Window {
    initMap: () => void;
  }
}
// decalre map type

const Home = () => {
  const router = useRouter();
  // this is inital function to show map and its element
  const initMap = () => {
    // decalre variable i set in component and return them to working here
    let { autocomplete, map, infowindow, marker } = variableDelareMethod();

    autocomplete.addListener("place_changed", () => {
      placeFind(map, autocomplete, infowindow, marker);
    });
  };
  // for rendering purpose we need to give route dependencies
  useEffect(() => {
    window.initMap = initMap;
  }, [router]);
  return (
    <div>
      <div>
        <input
          type="text"
          id="country-input"
          placeholder="select your place"
          className="py-3 px-1 border rounded-md"
        />
      </div>
      <div id="map"></div>
      <div id="infowindow-content">
        <span id="place-name" className="title"></span>
        <br />
        <span id="place-address"></span>
      </div>
    </div>
  );
};

export default Home;
