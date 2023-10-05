"use client";

import {
  address,
  mapCenter,
  properties,
  typeValue,
} from "@/components/googleType";

import { useEffect, useRef, useState } from "react";
declare global {
  interface Window {
    initMap: () => void;
  }
}

function Home() {
  const [locationCheck, setLocationCheck] = useState<string | null>("");
  const [name, setName] = useState<address>();
  const googleMapCenter: mapCenter = {
    center: { lat: 40.749933, lng: -73.98633 },
    zoom: 13,
    mapTypeControl: false,
  };

  async function initMap() {
    const input = document.getElementById("pac-input") as HTMLInputElement;
    console.log(input);
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;
    const { LatLng } = (await google.maps.importLibrary(
      "core"
    )) as google.maps.CoreLibrary;

    const map = new Map(document.getElementById("map") as HTMLElement, {
      zoom: 11,
      center: { lat: -28.024, lng: 140.887 },
      mapId: "4504f8b37365c3d0",
    });

    for (const property of properties) {
      const AdvancedMarkerElement =
        new google.maps.marker.AdvancedMarkerElement({
          map,
          content: buildContent(property),
          position: property.position,
          title: property.description,
        });

      AdvancedMarkerElement.addListener("click", () => {
        toggleHighlight(AdvancedMarkerElement, property);
      });
    }

    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    // custom clastering

    const card = document.getElementById("pac-card") as HTMLElement;
    // console.log(input);
    const biasInputElement = document.getElementById(
      "use-location-bias"
    ) as HTMLInputElement;

    const options = {
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
    };

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    const autocomplete = new google.maps.places.Autocomplete(input, options);

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
      console.log(place);

      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      // If the place has a geometry, then present it on a map.
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
      infowindow.open(map);
    });

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
        }
        input.value = "";
      });
    }
  }
  window.initMap = initMap;
  function toggleHighlight(markerView: any, property: any) {
    if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
    }
  }
  function buildContent(property: any) {
    const content = document.createElement("div");
    content.classList.add("property");
    content.innerHTML = `
          <div class="icon">
              <i aria-hidden="true" class="fa fa-icon fa-${property.type} text-3xl" title="${property.type}"></i>
               <span class="fa-sr-only">${property.type}</span>
          </div>
          <div class="details  ">
              <div class="price">${property.price}</div>
              <div class="address">${property.address}</div>
              <div class="features">
              <div>
                  <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
                  <span class="fa-sr-only">bedroom</span>
                  <span>${property.bed}</span>
              </div>
              <div>
                  <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
                  <span class="fa-sr-only">bathroom</span>
                  <span>${property.bath}</span>
              </div>
              <div>
                  <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
                  <span class="fa-sr-only">size</span>
                  <span>${property.size} ft<sup>2</sup></span>
              </div>
              </div>
          </div>
          `;
    return content;
  }

  const [address, setAddress] = useState<typeValue>({
    streetNumber: "",
    route: "",
    city: "",
    zip: "",
    country: "",
    state: "",
  });
  useEffect(() => {
    let value: typeValue = { ...address };
    name?.address_components?.map((item) => {
      if (item.types.includes("street_number")) {
        value.streetNumber = item.long_name;
      } else if (item.types.includes("route")) {
        value.route = item.long_name;
      } else if (item.types.includes("administrative_area_level_1")) {
        value.city = item.long_name;
      } else if (item.types.includes("country")) {
        value.country = item.long_name;
      } else if (item.types[0] === "postal_code") {
        value.zip = item.long_name;
      } else if (item.types.includes("locality")) {
        value.state = item.long_name;
      }
      console.log(value);
    });
    setAddress(value);
  }, [name?.address_components]);

  return (
    <div id="ma " className="relative">
      <div className="pac-card" id="pac-card">
        <div id="title">Adress Search</div>
        <div id="type-selector" className="pac-controls"></div>

        <div id="pac-container relative" className="border relative">
          <input
            id="pac-input"
            type="text"
            placeholder="Enter a location"
            className="px-5 py-5 "
          />
          <span className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2">
            {" "}
            {">"}{" "}
          </span>
        </div>
      </div>
      <div id="map"></div>
      <div id="infowindow-content">
        <span id="place-name" className="title"></span>
        <br />
        <span id="place-address"></span>
      </div>

      {/* <div className="flex justify-center  mt-5 ">
        {name?.name && (
          <div className=" bg-black text-white max-w-md rounded overflow-hidden shadow-lg border  ">
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
      </div> */}
      <div
        className="
      flex justify-around text-black"
      >
        <div>{address?.zip}</div>
        <div>{address?.country}</div>
        <div>{address?.streetNumber}</div>
        <div>{address?.route}</div>
        <div>{address?.state}</div>
      </div>
    </div>
  );
}

export default Home;
