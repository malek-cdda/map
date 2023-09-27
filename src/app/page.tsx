"use client";

import Script from "next/script";
import { useRef, useState } from "react";
declare global {
  interface Window {
    initMap: () => void;
  }
}
interface address {
  name: string;
  icon: string;
  address_components: {
    long_name: string | number;
    short_name: string | number;
  }[];
  geometry?: {
    location?: {
      lat?: number | any;
      lng?: number | any;
    };
  };
}
function Home() {
  const [locationCheck, setLocationCheck] = useState<string | null>("");
  const [name, setName] = useState<address>();
  console.log(name);
  function initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
        mapTypeControl: false,
      }
    );
    console.log(map);
    const card = document.getElementById("pac-card") as HTMLElement;
    const input = document.getElementById("pac-input") as HTMLInputElement;

    const biasInputElement = document.getElementById(
      "use-location-bias"
    ) as HTMLInputElement;
    const strictBoundsInputElement = document.getElementById(
      "use-strict-bounds"
    ) as HTMLInputElement;
    const options = {
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
    };

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
    console.log(map.controls[google.maps.ControlPosition.TOP_LEFT].push(card));
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    console.log(autocomplete);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);

    const infowindow: any = new google.maps.InfoWindow();
    const infowindowContent: any = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;

    infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
      const place: any = autocomplete.getPlace();
      console.log(place.geometry?.location?.lat());
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      // If the place has a geometry, then present it on a map.
      console.log(place);
      setName(place);
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });
    function setupClickListener(id: any, types: any) {
      const radioButton = document.getElementById(id) as HTMLInputElement;
      if (radioButton) {
        radioButton.addEventListener("click", () => {
          autocomplete.setTypes(types);
          input.value = "";
        });
      }
    }
    setupClickListener("changetype-all", []);
    setupClickListener("changetype-address", ["address"]);
    setupClickListener("changetype-establishment", ["establishment"]);
    setupClickListener("changetype-geocode", ["geocode"]);
    setupClickListener("changetype-cities", ["(cities)"]);
    setupClickListener("changetype-regions", ["(regions)"]);

    if (biasInputElement) {
      biasInputElement.addEventListener("change", () => {
        if (biasInputElement.checked) {
          autocomplete.bindTo("bounds", map);
        } else {
          autocomplete.unbind("bounds");
          autocomplete.setBounds({
            east: 180,
            west: -180,
            north: 90,
            south: -90,
          });
          strictBoundsInputElement.checked = biasInputElement.checked;
        }
        input.value = "";
      });

      strictBoundsInputElement.addEventListener("change", () => {
        autocomplete.setOptions({
          strictBounds: strictBoundsInputElement.checked,
        });

        if (strictBoundsInputElement.checked) {
          biasInputElement.checked = strictBoundsInputElement.checked;
          autocomplete.bindTo("bounds", map);
        }

        input.value = "";
      });
    }
  }
  window.initMap = initMap;
  console.log(typeof name?.geometry?.location?.lng());
  return (
    <div id="ma">
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs&callback=initMap&libraries=places&v=weekly"
        defer
      ></Script>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>

      <div className="pac-card" id="pac-card">
        <div id="title">Autocomplete search</div>
        <div id="type-selector" className="pac-controls">
          <input
            type="radio"
            name="type"
            id="changetype-all"
            onChange={() => {}}
            checked
          />

          <label htmlFor="changetype-all">All</label>
          <input type="radio" name="type" id="changetype-establishment" />
          <label htmlFor="changetype-establishment">establishment</label>
          <input type="radio" name="type" id="changetype-address" />
          <label htmlFor="changetype-address">address</label>
          <input type="radio" name="type" id="changetype-geocode" />
          <label htmlFor="changetype-geocode">geocode</label>
          <input type="radio" name="type" id="changetype-cities" />
          <label htmlFor="changetype-cities">(cities)</label>
          <input type="radio" name="type" id="changetype-regions" />
          <label htmlFor="changetype-regions">(regions)</label>
          <br />
          <div id="strict-bounds-selector" className="pac-controls">
            <input type="checkbox" id="use-location-bias" value="" />
            <label htmlFor="use-location-bias">Bias to map viewport</label>
            <input type="checkbox" id="use-strict-bounds" value="" />
            <label htmlFor="use-strict-bounds">Strict bounds</label>
          </div>
        </div>

        <div id="pac-container">
          <input
            id="pac-input"
            type="text"
            placeholder="Enter a location"
            onChange={(e: any) => setLocationCheck(e?.target)}
          />
        </div>
      </div>
      <div id="map"></div>
      <div id="infowindow-content">
        <span id="place-name" className="title"></span>
        <br />
        <span id="place-address"></span>
      </div>

      <div className="flex justify-center  mt-5">
        {name?.name && (
          <div className="max-w-md rounded overflow-hidden shadow-lg border">
            <img
              src={name?.icon}
              alt="Icon"
              className="w-full h-32 object-cover"
            />

            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{name?.name}</div>

              {name?.address_components?.map((item: any, index: any) => (
                <div key={index} className="flex justify-around">
                  <p className="text-gray-700 text-base">
                    {item[0]?.long_name}
                  </p>

                  {item?.types[0] === "postal_code" && (
                    <p className="text-gray-700 text-base">
                      {" "}
                      ZIP CODE : {item?.long_name}
                    </p>
                  )}
                </div>
              ))}

              <p className="text-gray-700 text-base">
                Latitude:{" "}
                {name?.geometry?.location?.lat() &&
                  name?.geometry?.location?.lat()}
                , Longitude:{" "}
                {name?.geometry?.location?.lng() &&
                  name?.geometry?.location?.lng()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
