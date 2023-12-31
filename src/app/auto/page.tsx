"use client";

import Script from "next/script";
import { useState } from "react";

const Home = () => {
  let map: google.maps.Map;
  let featureLayer: any;
  let infoWindow: any;
  let lastInteractedFeatureIds: any = [];
  let lastClickedFeatureIds: any = [];

  function handleClick(/* MouseEvent */ e: any) {
    lastClickedFeatureIds = e.features.map((f: any) => f.placeId);
    lastInteractedFeatureIds = [];
    featureLayer.style = applyStyle;
    createInfoWindow(e);
  }

  function handleMouseMove(/* MouseEvent */ e: any) {
    lastInteractedFeatureIds = e.features.map((f: any) => f.placeId);
    featureLayer.style = applyStyle;
  }

  async function initMap() {
    // Request needed libraries.
    const { Map, InfoWindow } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;

    map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 39.23, lng: -105.73 },
      zoom: 8,
      // In the cloud console, configure your Map ID with a style that enables the
      // 'Administrative Area Level 2' Data Driven Styling type.
      mapId: "a3efe1c035bad51b", // Substitute your own map ID.
      mapTypeControl: false,
    });

    // Add the feature layer.
    //@ts-ignore
    featureLayer = map.getFeatureLayer("ADMINISTRATIVE_AREA_LEVEL_2");

    // Add the event listeners for the feature layer.
    featureLayer.addListener("click", handleClick);
    featureLayer.addListener("mousemove", handleMouseMove);

    // Map event listener.
    map.addListener("mousemove", () => {
      // If the map gets a mousemove, that means there are no feature layers
      // with listeners registered under the mouse, so we clear the last
      // interacted feature ids.
      if (lastInteractedFeatureIds?.length) {
        lastInteractedFeatureIds = [];
        featureLayer.style = applyStyle;
      }
    });

    // Create the infowindow.
    infoWindow = new InfoWindow({});
    // Apply style on load, to enable clicking.
    featureLayer.style = applyStyle;
  }

  // Helper function for the infowindow.
  async function createInfoWindow(event: any) {
    let feature = event.features[0];
    if (!feature.placeId) return;

    // Update the infowindow.
    const place = await feature.fetchPlace();
    let content =
      '<span style="font-size:small">Display name: ' +
      place.displayName +
      "<br/> Place ID: " +
      feature.placeId +
      "<br/> Feature type: " +
      feature.featureType +
      "</span>";

    updateInfoWindow(content, event.latLng);
  }

  // Define styles.
  // Stroke and fill with minimum opacity value.
  const styleDefault = {
    strokeColor: "#810FCB",
    strokeOpacity: 1.0,
    strokeWeight: 2.0,
    fillColor: "white",
    fillOpacity: 0.1, // Polygons must be visible to receive events.
  };
  // Style for the clicked polygon.
  const styleClicked = {
    ...styleDefault,
    fillColor: "#810FCB",
    fillOpacity: 0.5,
  };
  // Style for polygon on mouse move.
  const styleMouseMove = {
    ...styleDefault,
    strokeWeight: 4.0,
  };

  // Apply styles using a feature style function.
  function applyStyle(/* FeatureStyleFunctionOptions */ params: any) {
    const placeId = params.feature.placeId;
    //@ts-ignore
    if (lastClickedFeatureIds.includes(placeId)) {
      return styleClicked;
    }
    //@ts-ignore
    if (lastInteractedFeatureIds.includes(placeId)) {
      return styleMouseMove;
    }
    return styleDefault;
  }

  // Helper function to create an info window.
  function updateInfoWindow(content: any, center: any) {
    infoWindow.setContent(content);
    infoWindow.setPosition(center);
    infoWindow.open({
      map,
      shouldFocus: false,
    });
  }

  window.initMap = initMap;

  return (
    <div>
      {" "}
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs&callback=initMap&libraries=places&v=weekly"
        defer
      ></Script>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>
      <div id="map"></div>
    </div>
  );
};

export default Home;
