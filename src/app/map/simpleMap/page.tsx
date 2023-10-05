"use client";
import { useEffect } from "react";
const Home = () => {
  async function initMap() {
    // map is build in method to show map in window display
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 3,
      }
    );
  }
  window.initMap = initMap;
  return (
    <div>
      <div
        id="map"
        className="
      h-100"
      ></div>
    </div>
  );
};

export default Home;
