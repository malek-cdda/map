"use client";
import { Items1 } from "@/components/Items";
import {
  circleArea,
  dragAble,
  findProperty,
  markerCustom,
  markerData,
  nearBySearch,
  placeFind,
  streetView,
} from "@/components/marker/data";
import Index from "@/components/selectProduct";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

var service;
var infowindow;
let panorama: google.maps.StreetViewPanorama;
// declare map types
var map: google.maps.Map;
let infoWindow: google.maps.InfoWindow;
const Home = () => {
  const [cirValue, setCirvalue] = useState<any>({});
  let myData: any = markerData;
  const [toggle, setToggle] = useState(true);
  const [state, setState] = useState<any>(null);
  const [neerby, setNearBy] = useState<any>([]);
  // const [error, setError] = useState<any>(true);
  if (state) {
    myData = markerData.filter((item: any) => item?.state === state);
  }
  const [product, setProduct] = useState<any>({
    position: { lat: 34.8559195, lng: -111.7988186 },
  });
  if (product?.title) {
    myData = markerData.filter(
      (item: any) =>
        cirValue?.highestLatitude >= item?.position?.lat &&
        cirValue.lowestLatitude <= item.position.lat &&
        cirValue?.highestLongitude >= item?.position?.lng &&
        cirValue.lowestLongitude <= item.position.lng
    );
    console.log(myData);
  }

  //  zoom in out drug click to the map function here
  const [customToggle, setCustomToggle] = useState<any>({
    circle: false,
    street: false,
    line: false,
    dragAble: false,
  });
  const handleCircles = (e: any) => {
    setCustomToggle({
      ...customToggle,
      ...e,
    });
  };
  useEffect(() => {
    async function initMap() {
      // decalre map library
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      const input = document.getElementById(
        "country-input"
      ) as HTMLInputElement;
      // marker advance import from google marker library
      const { AdvancedMarkerElement, PinElement } =
        (await google.maps.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;
      var pyrmonts = new google.maps.LatLng(-33.8665433, 151.1956316);
      map = new Map(document.getElementById("map") as HTMLElement, {
        center: pyrmonts,
        zoom: 7,
        maxZoom: 10,
        minZoom: 5,
        mapId: "15431d2b469f209dsfdsfsde",
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
      // map.addListener("click", () => {
      //   console.log(map.getCenter().lat(), map.getCenter().lng());
      // });
      // marker customization
      markerCustom(
        AdvancedMarkerElement,
        map,
        toggle,
        PinElement,
        infoWindow,
        customToggle.line
      );
      // set item center selected product
      map.setCenter({
        lat: product?.position?.lat,
        lng: product?.position?.lng,
      });
      autocomplete.bindTo("bounds", map);
      const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
      });
      // autocomplete field for searcing
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

      // street view function
      if (customToggle?.street) {
        streetView(map, product, setProduct);
      }

      //  dragAble function decalre here
      if (customToggle?.dragAble) {
        dragAble(map, infoWindow, setProduct, AdvancedMarkerElement);
      }

      // cicle the area
      if (customToggle?.circle) {
        circleArea(map, setCirvalue);
      }

      if (product.title) {
        infoWindow.open(map);
      }
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [toggle, product, customToggle]);

  return (
    <div>
      <div id="map" className="h-[500px]"></div>
      <div id="pano" className="h-[300px] w-full"></div>
      <div>
        {[
          {
            circle: true,
            value: "circle",
          },
          {
            line: true,
            value: "line",
          },
          {
            street: true,
            value: "street",
          },
          {
            dragAble: true,
            value: "dragAble",
          },
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => handleCircles(item)}
            className="text-white px-5 py-1 bg-green-500 mx-5 rounded-md my-2 "
          >
            {item.value}
          </button>
        ))}
      </div>
      <div>
        <input
          type="text"
          id="country-input"
          placeholder="select your place"
          className="py-3 px-1 border rounded-md"
        />
      </div>
      {myData.length && <Index data={myData} setProduct={setProduct} />}
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

// 31.679993, -81.813439
// 29.900472, -82.137332
// 1.779521 0.793432
//0.323893
