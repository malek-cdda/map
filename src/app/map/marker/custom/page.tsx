"use client";
import { markerData } from "@/components/marker/data";
import { useEffect } from "react";

const Home = () => {
  // Define marker positions (latitude and longitude)
  const markerPositions = [
    { lat: 41.878, lng: -87.629 },
    { lat: 40.714, lng: -74.005 },
    { lat: 31.814, lng: -87.025 },
    { lat: 51.614, lng: -4.065 },
    // Add more marker positions here
  ];

  function initMap() {
    const map = new google.maps.Map(document.getElementById("map") as any, {
      zoom: 4,
      center: { lat: 37.09, lng: -95.712 },
      mapTypeId: "terrain",
    });

    // Create an array of polyline coordinates
    const polylineCoordinates = markerData.map((position) => {
      return new google.maps.LatLng(
        position.position.lat,
        position.position.lng
      );
    });

    // Create a polyline to connect the markers
    const polyline = new google.maps.Polyline({
      path: polylineCoordinates,
      geodesic: true,
      strokeColor: "#FF0000", // Line color
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });

    // Set the map for the polyline
    polyline.setMap(map);
  }

  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, []);
  return (
    <div id="map" className="h-[600px]">
      {" "}
    </div>
  );
};

export default Home;
