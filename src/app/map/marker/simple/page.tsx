"use client";
import Custome from "@/components/customeCard/Custome";
import {
  findProperty,
  markerCustom,
  markerData,
} from "@/components/marker/data";
import Index from "@/components/selectProduct";
import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Content } from "next/font/google";

// declare map types
let map: google.maps.Map;
let infoWindow: google.maps.InfoWindow;
const Home = () => {
  let myData: any = markerData;
  const [toggle, setToggle] = useState(true);
  const [state, setState] = useState<any>(null);
  if (state) {
    myData = myData.filter((item: any) => item?.state === state);
  }
  const [product, setProduct] = useState<any>({
    position: { lat: 34.8559195, lng: -111.7988186 },
  });
  async function initMap() {
    // decalre map library
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    // marker advance import from google marker library
    const { AdvancedMarkerElement, PinElement } =
      (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
    var pyrmonts = new google.maps.LatLng(-33.8665433, 151.1956316);
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: pyrmonts,
      zoom: 14,
      mapId: "googlemapid",
      zoomControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
    });
    // custom zoom button
    // var zoomInButton: any = document.createElement("div");
    // var zoomControlDiv: any = document.createElement("div");
    // var zoomControl: any = ZoomControl(zoomControlDiv, map);
    // zoomControlDiv.index = 1;
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);
    // declare inforwindow
    const content = ReactDOMServer.renderToStaticMarkup(
      <Items1 product={product} />
    );
    let infoWindow = new google.maps.InfoWindow({
      content: content,
      position: product?.position,
    });
    // let values: any = "zoom_changed" | "drag" | "click";
    // zoom out in for change the map property
    findProperty("zoom_changed", setState, map);
    // draggable to change map property
    findProperty("drag", setState, map);
    // click to change map property
    findProperty("click", setState, map);
    // marker customization
    markerCustom(AdvancedMarkerElement, map, toggle, PinElement, infoWindow);
    // set item center selected product
    map.setCenter({ lat: product?.position?.lat, lng: product?.position?.lng });
    // show product in the map
    infoWindow.open(map);
  }
  //  zoom in out drug click to the map function here

  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [toggle, product]);

  return (
    <div>
      <div id="map" className="h-[500px]"></div>
      {myData.length && (
        <Index data={myData} product={product} setProduct={setProduct} />
      )}
      {!myData.length && <h1>not found any data sorry brother or sister</h1>}
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

export const Items1 = ({ product }: any) => {
  return <>welcome back hom e {product?.title}</>;
};
