"use client";
import { useEffect, useState } from "react";
import { propertyData } from "./data";
const Home = () => {
  const [singlePropertyData, setSinglePropertyData] = useState<any>({});
  const [latlng, setLatLng] = useState({ lat: -35.304724, lng: 148.662905 });

  async function initMap() {
    // map is build in method to show map in window display
    const input = document.getElementById("pacinput") as HTMLInputElement;
    console.log(input);
    // console.log(latlng);
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: latlng,
        zoom: 3,
      }
    );
    map.addListener("mousemove", (e: any) => {
      console.log(latlng);
    });
  }

  window.initMap = initMap;

  return (
    <div className=" ">
      {/* <section className="flex flex-wrap justify-between gap-3 px-5">
        {propertyData.map((item: any, index) => (
          <div
            id="input-1"
            key={index}
            className="bg-green-500 text-white"
            onMouseMove={(e) => {
              //   setLatLng(item?.position);
              //   console.log(item.position);
              window.initMap = initMap;
            }}
          >
            <h1>name : {item.name}</h1>
          </div>
        ))}
      </section>
      <section> */}
      <input type="button" value="ubmists" id="pacinput" className="border" />
      <div
        id="map"
        className="
      h-100 w-1/2"
      ></div>
      {/* </section> */}
    </div>
  );
};

export default Home;
