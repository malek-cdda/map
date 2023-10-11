"use client";
import {
  address,
  mapCenter,
  properties,
  typeValue,
} from "@/components/googleType";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
declare global {
  interface Window {
    initMap: () => void;
  }
}
// decalre map type
let map: google.maps.Map;
function Home() {
  const router = useRouter();
  const [findProperty, setProperty] = useState<any | object>({});
  const [state, setState] = useState("");
  function initMap(): void {
    const myLatlng = { lat: 45.367584, lng: -68.972168 };
    map = new google.maps.Map(document.getElementById("map")!, {
      zoom: 4,
      center: myLatlng,
    });
    //  infoWindow show display
    let infoWindow = new google.maps.InfoWindow({
      content: " ",
      position: myLatlng,
    });
    // Configure the click listener.
    map.addListener("click", (e: any) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat: e.latLng.lat(), lng: e.latLng.lng() } },
        (results: any, status) => {
          console.log(results[0]);
          setProperty(results);
          const addressComponents = results[0].address_components;
          for (const component of addressComponents) {
            if (component.types.includes("administrative_area_level_1")) {
              const state = component.long_name;
              setState(state);
              console.log("State:", state);
            }
          }
        }
      );
      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: e.latLng,
      });
      infoWindow.setContent(JSON.stringify(e.latLng.toJSON(), null, 2));
      infoWindow.open(map);
    });
  }

  //  rendering map when page change
  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      window.initMap = initMap;
      initMap();
    }
  }, [router]);
  let property = properties.filter((property) => property?.state == state);
  console.log(property);
  return (
    <div>
      <div id="map" className="h-[500px]"></div>
      <div>{} its connected</div>
    </div>
  );
}

export default Home;
