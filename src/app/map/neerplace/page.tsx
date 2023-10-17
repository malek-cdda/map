"use client";
import { useEffect, useState } from "react";

var map: any;
var service;
var infowindow;
const Home = () => {
  const [arr, setArr] = useState<any>([]);
  async function initMap() {
    var pyrmonts = new google.maps.LatLng(-33.8665433, 151.1956316);
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: pyrmonts,
      zoom: 15,
    });

    // map.addListener("drag", (e: any) => {
    //   const geocoder = new google.maps.Geocoder();
    //   geocoder.geocode(
    //     { location: { lat: map.center.lat(), lng: map.center.lng() } },
    //     (results: any, status) => {
    //       console.log(results[0]);
    //       // setProperty(results);
    //       const addressComponents = results[0].address_components;
    //       for (const component of addressComponents) {
    //         if (component.types.includes("administrative_area_level_1")) {
    //           const state = component.long_name;
    //           // setState(state);
    //           console.log("State:", state);
    //         }
    //       }
    //     }
    //   );

    // Close the current InfoWindow.
    // infoWindow.close();
    // // Create a new InfoWindow.
    // infoWindow = new google.maps.InfoWindow({
    //   position: e.latLng,
    // });
    // infoWindow.setContent(JSON.stringify(e.latLng.toJSON(), null, 2));
    // infoWindow.open(map);
    // });
    // map.addListener("zoom", (e: any) => {
    //   const geocoder = new google.maps.Geocoder();
    //   geocoder.geocode(
    //     { location: { lat: map.center.lat(), lng: map.center.lng() } },
    //     (results: any, status) => {
    //       console.log(results[0]);
    //       // setProperty(results);
    //       const addressComponents = results[0].address_components;
    //       for (const component of addressComponents) {
    //         if (component.types.includes("administrative_area_level_1")) {
    //           const state = component.long_name;
    //           // setState(state);
    //           console.log("State:", state);
    //         }
    //       }
    //     }
    //   );
    // });
    // map.addListener("click", (e: any) => {
    //   console.log(e.latLng.lat(), e.latLng.lng());
    // });

    let lat: number = -33.8665433;
    let lng: number = 151.1956316;
    var pyrmont = new google.maps.LatLng(lat, lng);
    var request: any = {
      location: pyrmont,
      radius: "500",
      type: ["restaurant"],
      // keyword: ["hotel"],
    };
    // map.setCenter(pyrmont);
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results: any, status: any) {
      setArr((prev: any) => [...prev, results]);
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          // createMarker(results[i]);
        }
      }
    }
  }
  async function createMarker(places: any) {}

  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, []);

  return (
    <div>
      <div id="map" className="h-[600px]"></div>
      <Item arr={arr} />
    </div>
  );
};

export default Home;
const Item = ({ arr }: any) => {
  return (
    <div>
      {arr.length > 0 &&
        arr.map((item: any, i: any) => (
          <div key={i}>
            {item.map((item1: any, i1: any) => (
              <div key={i1}>
                <p>{item1.name}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
