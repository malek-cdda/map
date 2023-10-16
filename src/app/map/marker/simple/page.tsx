"use client";
import Custome from "@/components/customeCard/Custome";
import { ZoomControl, markerData } from "@/components/marker/data";
import Index from "@/components/selectProduct";
import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

// declare map types
let map: google.maps.Map;
let infoWindow: google.maps.InfoWindow;
const Home = () => {
  const [toggle, setToggle] = useState(true);
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
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 34.8559195, lng: -111.7988186 },
      zoom: 14,
      mapId: "googlemapid",
      zoomControl: false,
    });
    // custom zoom button
    var zoomInButton: any = document.createElement("div");
    var zoomControlDiv: any = document.createElement("div");
    var zoomControl: any = ZoomControl(zoomControlDiv, map);
    zoomControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);
    // declare inforwindow
    const content = ReactDOMServer.renderToStaticMarkup(
      <Items1 product={product} />
    );
    let infoWindow = new google.maps.InfoWindow({
      content: content,
      position: product?.position,
    });
    // marker declare
    markerCustom(AdvancedMarkerElement, map, toggle, PinElement, infoWindow);
    // set item center selected product
    map.setCenter({ lat: product?.position?.lat, lng: product?.position?.lng });
    // show product in the map
    infoWindow.open(map);
  }
  //   custome value show in marker
  async function markerCustom(
    params: any,
    map: any,
    toggle: any,
    PinElement: any,
    infoWindow: any
  ) {
    markerData.forEach((items) => {
      const { position, price, title, img } = items;
      // customer marker design for every user
      const beachFlagImg = document.createElement("img");
      beachFlagImg.src = `${img}`;
      beachFlagImg.className = "absolute top-0 w-25 h-25";
      const priceTag = document.createElement("div");
      priceTag.className =
        "bg-red-800 w-15 h-5 pt-1 rounded-full px-4 text-white relative";
      priceTag.textContent = price;
      priceTag.appendChild(beachFlagImg);
      //   pinelement set for change marker design
      const pinScaled = new PinElement({
        scale: 1.5,
        glyph: `${price}`,
        glyphColor: "green",
        background: "yellow",
      });
      const marker = new params({
        map,
        position,
        content: toggle ? pinScaled?.element : priceTag,
      });
      marker.addListener("click", ({ domEvent }: any) => {
        // infoWindow.close();
        infoWindow.setContent(<Items1 product={items} />);
        infoWindow.open(marker.map, marker);
      });
    });
  }

  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [toggle, product]);
  return (
    <div>
      <div id="map" className="h-[500px]"></div>
      <Index data={markerData} product={product} setProduct={setProduct} />
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

// git branch -m main development
// git fetch origin
// git branch -u origin/development development
// git remote set-head origin -a
