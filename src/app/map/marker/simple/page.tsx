"use client";
import Custome from "@/components/customeCard/Custome";
import { markerData } from "@/components/marker/data";
import Index from "@/components/selectProduct";
import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
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
    });
    // declare inforwindow
    let infoWindow = new google.maps.InfoWindow({
      content: buildContent(product),
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
    markerData.forEach(({ position, price, title, img }) => {
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
        const { target } = domEvent;
        // infoWindow.close();
        infoWindow.setContent(buildContent(product));
        infoWindow.open(marker.map, marker);
      });
    });
  }
  function buildContent(property: any) {
    const container = document.createElement("div");

    // ReactDOM.render(<Custome />, container);
    const content = document.createElement("div");

    content.innerHTML = `
            <div class="icon  ">
         
             <span aria-hidden="true" class=" "  >${property.price}</span>
                 <span class="fa-sr-only">${property?.position?.lat}</span>
            </div>
            <input  class="border bg-red-800 " />
            <div class="details  ">
                <div class="price">${property?.position?.lng}</div>
                <div class="address">${property?.title}</div>
            </div>
            `;
    return content;
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

export const Items1 = () => {
  return <>welcome back home</>;
};

// git branch -m main development
// git fetch origin
// git branch -u origin/development development
// git remote set-head origin -a
