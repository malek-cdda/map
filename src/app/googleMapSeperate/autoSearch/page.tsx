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
let map: google.maps.Map;
let featureLayer;
function Home() {
  const [name, setName] = useState<address>();
  const googleMapCenter: mapCenter = {
    center: { lat: 40.749933, lng: -73.98633 },
    zoom: 13,
    mapTypeControl: false,
  };
  async function initMap() {
    const input = document.getElementById("pac-input") as HTMLInputElement;
    // show position on a map == Advancemarkerelement
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;
    // latlng show latitude and longatute
    const { LatLng } = (await google.maps.importLibrary(
      "core"
    )) as google.maps.CoreLibrary;

    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    //display popup window in the map
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 39.23, lng: -105.73 }, // Hana, HI
      zoom: 12,
      // In the cloud console, configure this Map ID with a style that enables the
      // "Locality" feature layer.
      mapId: "a3efe1c035bad51b", // <YOUR_MAP_ID_HERE>,
    });

    const card = document.getElementById("pac-card") as HTMLElement;
    // console.log(input);
    const biasInputElement = document.getElementById(
      "use-location-bias"
    ) as HTMLInputElement;
    const options = {
      fields: ["address_components", "geometry", "icon", "name", "place_id"],
      strictBounds: false,
    };
    // find place library  = autcomplete
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    const infowindow: any = new google.maps.InfoWindow();
    const infowindowContent: any = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;
    // marker is a indicator of a place
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
    // local area find with border search it address of locality if locality address have then it work otherwise not working
    featureLayer = map.getFeatureLayer("LOCALITY");

    for (const property of properties) {
      const AdvancedMarkerElement =
        new google.maps.marker.AdvancedMarkerElement({
          map,
          //   content: buildContent(property),
          position: property.position,
          title: property.description,
        });

      //   AdvancedMarkerElement.addListener("click", () => {
      //     toggleHighlight(AdvancedMarkerElement, property);
      //   });
    }

    // Set up the geocoder.
    var geocoder;

    async function getPlaceIdWithRestrictions(latLng) {
      // Check if the geocoder is initialized.
      if (!geocoder) {
        console.error(
          "Geocoder is not initialized. Call initializeGeocoder() first."
        );
        return;
      }

      var geocodeRequest = {
        location: latLng,
      };
      geocoder
        .geocode(geocodeRequest)
        .then(function (response: any) {
          console.log("Geocoding result with restriction:");
          var results = response.results;
          if (results.length > 0) {
            console.log(results);
            var placeId = results[0].place_id;

            var addressComponents = results[0].address_components;
            var type = addressComponents[1].types[0];
            var longName = addressComponents[1].long_name;

            console.log("Place ID: " + placeId);
            console.log("Address Components: ");
            console.log(addressComponents);
            console.log("Type of the second address component: " + type);
            console.log(
              "Long Name of the second address component: " + longName
            );
          } else {
            console.log("No results found.");
          }
        })
        .catch(function (error) {
          console.log("Geocoding failed due to: " + error);
        });
    }

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    autocomplete.bindTo("bounds", map);

    infowindow.setContent(infowindowContent);

    let place: any;
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
      place = autocomplete.getPlace();
      console.log(place);
      // Apply the style to a single boundary.
      //@ts-ignore

      if (!place.geometry || !place.geometry.location) {
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      // If the place has a geometry, then present it on a map.
      setName(place);
      getPlaceIdWithRestrictions({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
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
    // custom area layer design
    const featureStyleOptions: google.maps.FeatureStyleOptions = {
      strokeColor: "#810FCB",
      strokeOpacity: 1.0,
      strokeWeight: 3.0,
      fillColor: "#810FCB",
      fillOpacity: 0.5,
    };

    featureLayer.style = (options: { feature: { placeId: string } }) => {
      if (options.feature.placeId == place?.place_id) {
        console.log(place.place_id);
        return featureStyleOptions;
      }
    };
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

  //   function toggleHighlight(markerView: any, property: any) {
  //     if (markerView.content.classList.contains("highlight")) {
  //       markerView.content.classList.remove("highlight");
  //       markerView.zIndex = null;
  //     } else {
  //       markerView.content.classList.add("highlight");
  //       markerView.zIndex = 1;
  //     }
  //   }

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

  const router = useRouter();
  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      window.initMap = initMap;
      initMap();
    }
  }, [router]);
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

// function buildContent(property: any) {
//     const content = document.createElement("div");
//     content.classList.add("property");
//     content.innerHTML = `
//           <div class="icon">
//               <i aria-hidden="true" class="fa fa-icon fa-${property.type} text-3xl" title="${property.type}"></i>
//                <span class="fa-sr-only">${property.type}</span>
//           </div>
//           <div class="details  ">
//               <div class="price">${property.price}sdfdsfds</div>
//               <div class="address">${property.address}</div>
//               <div class="features">
//               <div>
//                   <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
//                   <span class="fa-sr-only">bedroom</span>
//                   <span>${property.bed}</span>
//               </div>
//               <div>
//                   <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
//                   <span class="fa-sr-only">bathroom</span>
//                   <span>${property.bath}</span>
//               </div>
//               <div>
//                   <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
//                   <span class="fa-sr-only">size</span>
//                   <span>${property.size} ft<sup>2</sup></span>
//               </div>
//               </div>
//           </div>
//           `;
//     return content;
//   }
