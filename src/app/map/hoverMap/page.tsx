"use client";
import { useEffect, useState } from "react";
import { propertyData } from "./data";
import { useRouter } from "next/navigation";
declare global {
  interface Window {
    initMap: () => void;
  }
}
const Home = () => {
  const [singlePropertyData, setSinglePropertyData] = useState<any>({});
  const [latlng, setLatLng] = useState({ lat: -35.304724, lng: 148.662905 });

  async function initMap(): Promise<void> {
    // map is build in method to show map in window display

    const input = document.getElementById("input-1") as HTMLInputElement;
    console.log(input);
    console.log(latlng);
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: latlng,
        zoom: 3,
      }
    );
    let infoWindow = new google.maps.InfoWindow({
      content: `${latlng.lat}`,
      position: latlng,
    });

    infoWindow.open(map);
    console.log(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent: any) => {
      // Close the current InfoWindow.
      console.log(mapsMouseEvent);
      //   infoWindow.close();

      // Create a new InfoWindow.
      //   infoWindow = new google.maps.InfoWindow({
      //     position: mapsMouseEvent.latLng,
      //   });
      //   infoWindow.setContent(
      //     JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      //   );
      //   infoWindow.open(map);
    });
  }
  const router = useRouter();
  useEffect(() => {
    //
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      // Initialize the map when the component mounts
      window.initMap = initMap;
      initMap();
    }
  }, [router, latlng]);
  return (
    <div className="grid  grid-cols-2">
      <section className="flex flex-wrap justify-between gap-3 px-5">
        {propertyData.map((item: any, index) => (
          <div
            id="input-1"
            key={index}
            className="bg-green-500 text-white"
            onMouseMove={(e) => {
              setLatLng(item?.position);
              //   console.log(item.position);
              //   window.initMap = initMap;
            }}
          >
            <h1>name : {item.name}</h1>
          </div>
        ))}
      </section>
      <section>
        <div
          id="map"
          className="
      h-100"
        ></div>
      </section>
    </div>
  );
};

export default Home;
