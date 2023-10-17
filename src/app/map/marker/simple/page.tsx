"use client";
import {
  findProperty,
  markerCustom,
  markerData,
  nearBySearch,
  placeFind,
} from "@/components/marker/data";
import Index from "@/components/selectProduct";
import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

var service;
var infowindow;
let panorama: google.maps.StreetViewPanorama;
// declare map types
let map: google.maps.Map;
let infoWindow: google.maps.InfoWindow;
const Home = () => {
  let myData: any = markerData;
  const [toggle, setToggle] = useState(true);
  const [state, setState] = useState<any>(null);
  const [neerby, setNearBy] = useState<any>([]);
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
    const input = document.getElementById("country-input") as HTMLInputElement;
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
    const options = {
      fields: ["address_components", "geometry", "icon", "name", "place_id"],
      strictBounds: false,
    };
    // find place library  = autcomplete
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    const values = ["zoom_changed", "drag", "click"];

    values.forEach((val) => {
      findProperty(val, setState, map, infoWindow, setNearBy);
    });

    // marker customization
    markerCustom(AdvancedMarkerElement, map, toggle, PinElement, infoWindow);
    // set item center selected product
    map.setCenter({ lat: product?.position?.lat, lng: product?.position?.lng });
    autocomplete.bindTo("bounds", map);
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
    autocomplete.addListener("place_changed", () => {
      const v = placeFind(map, autocomplete, infoWindow, marker, setState);
      map.setCenter(v);
      infoWindow.setPosition(v);
      infoWindow.setContent("how r uy asdf");
      infoWindow.open(map);
      // call for nearby place function
      nearBySearch(map, setNearBy);
    });
    //  here street view function

    const sv = new google.maps.StreetViewService();
    panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano") as HTMLElement
    );
    sv.getPanorama({ location: product.position, radius: 50 }).then(
      processSVData
    );
    map.addListener("click", (event: any) => {
      sv.getPanorama({ location: event.latLng, radius: 50 })
        .then(processSVData)
        .catch((e) =>
          console.error("Street View data not found for this location.")
        );
    });

    if (product.title) {
      infoWindow.open(map);
    }
  }
  function processSVData({ data }: google.maps.StreetViewResponse) {
    const location = data.location!;

    panorama.setPano(location.pano as string);
    panorama.setPov({
      heading: 270,
      pitch: 0,
    });
    panorama.setVisible(true);

    map.addListener("click", () => {
      const markerPanoID = location.pano;

      // Set the Pano to use the passed panoID.
      panorama.setPano(markerPanoID as string);
      panorama.setPov({
        heading: 270,
        pitch: 0,
      });
      panorama.setVisible(true);
    });
  }
  //  zoom in out drug click to the map function here
  console.log(product, "product");
  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [toggle, product]);

  return (
    <div>
      <div id="map" className="h-[500px]"></div>
      <div id="pano" className="h-[300px] w-full"></div>

      <div>
        <input
          type="text"
          id="country-input"
          placeholder="select your place"
          className="py-3 px-1 border rounded-md"
        />
      </div>
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
      <div>
        {neerby.map((item: any) => (
          <div key={item.place_id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const Items1 = ({ product }: any) => {
  return <>welcome back hom e {product?.title}</>;
};
