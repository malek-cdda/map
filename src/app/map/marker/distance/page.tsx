"use client";
import { useEffect, useState } from "react";

const Home = () => {
  let marker1: google.maps.Marker, marker2: google.maps.Marker;
  let marker3: google.maps.Marker, marker4: google.maps.Marker;
  let poly: google.maps.Polyline, geodesicPoly: google.maps.Polyline;
  async function initMap() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 4,
        center: { lat: 34, lng: -40.605 },
      }
    );
    console.log(map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById("info") as HTMLElement
    );
    marker1 = new google.maps.Marker({
      map,
      draggable: true,
      position: { lat: 40.714, lng: -74.006 },
    });
    marker2 = new google.maps.Marker({
      map,
      draggable: true,
      position: { lat: 48.857, lng: 2.352 },
    });
    marker3 = new google.maps.Marker({
      map,
      draggable: true,
      position: { lat: 41.714, lng: -71.006 },
    });
    marker4 = new google.maps.Marker({
      map,
      draggable: true,
      position: { lat: 49.857, lng: 3.352 },
    });
    const bounds = new google.maps.LatLngBounds(
      marker1.getPosition() as google.maps.LatLng,
      marker2.getPosition() as google.maps.LatLng
    );
    const boundss = new google.maps.LatLngBounds(
      marker3.getPosition() as google.maps.LatLng,
      marker4.getPosition() as google.maps.LatLng
    );
    map.fitBounds(bounds);
    map.fitBounds(boundss);
    google.maps.event.addListener(marker1, "position_changed", update);
    google.maps.event.addListener(marker2, "position_changed", update);
    google.maps.event.addListener(marker3, "position_changed", updates);
    google.maps.event.addListener(marker4, "position_changed", updates);
    poly = new google.maps.Polyline({
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: map,
    });
    geodesicPoly = new google.maps.Polyline({
      strokeColor: "#CC0099",
      strokeOpacity: 1.0,
      strokeWeight: 3,
      geodesic: true,
      map: map,
    });
    update();
    updates();
  }
  function update() {
    const path = [
      marker1.getPosition() as google.maps.LatLng,
      marker2.getPosition() as google.maps.LatLng,
    ];
    poly.setPath(path);
    geodesicPoly.setPath(path);
  }
  function updates() {
    const path = [
      marker3.getPosition() as google.maps.LatLng,
      marker4.getPosition() as google.maps.LatLng,
    ];
    poly.setPath(path);
    geodesicPoly.setPath(path);
  }

  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, []);
  return <div id="map" className="h-[700px]"></div>;
};

export default Home;
