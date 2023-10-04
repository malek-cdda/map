"use client";
import {
  mapCenter,
  properties,
  styleClicked,
  styleDefault,
  styleMouseMove,
} from "@/components/googleType";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

import Script from "next/script";
declare global {
  interface Window {
    initMap: () => void;
  }
}

const page = () => {
  // let maps: google.maps.Map;
  let featureLayer: any;
  let infoWindows: any;
  let lastInteractedFeatureIds: any = [];
  let lastClickedFeatureIds: any = [];

  function handleClick(/* MouseEvent */ e: any) {
    lastClickedFeatureIds = e.features.map((f: any) => f.placeId);
    lastInteractedFeatureIds = [];
    featureLayer.style = applyStyle;

    createInfoWindow(e);
  }

  function handleMouseMove(/* MouseEvent */ e: any) {
    lastInteractedFeatureIds = e.features.map((f: any) => f.placeId);
    featureLayer.style = applyStyle;
  }
  async function initMap() {
    // input field event get
    const input = document.getElementById("pac-input") as HTMLInputElement;
    // Request needed libraries.
    const { InfoWindow } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement } =
      (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

    let map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 3,
        center: { lat: -28.024, lng: 140.887 },

        mapId: "a3efe1c035bad51b", // Substitute your own map ID.
        mapTypeControl: false,
      }
    );

    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    const options = {
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    // autocomplete place find here

    // Create an array of alphabetical characters used to label the markers.

    const markerss = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", () => {
      infoWindow.close();
      markerss.setVisible(false);
      const place: any = autocomplete.getPlace();
      console.log(place);

      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      // If the place has a geometry, then present it on a map.
      // setName(place);
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      markerss.setPosition(place.geometry.location);
      markerss.setVisible(true);
      // infowindowContent.children["place-name"].textContent = place.name;
      // infowindowContent.children["place-address"].textContent =
      //   place.formatted_address;
      // infowindow.open(map);
    });

    // Add some markers to the map.
    const markers = properties.map((position, i) => {
      const pinGlyph = new google.maps.marker.PinElement({
        glyph: "sdf",
        glyphColor: "green",
        borderColor: "yellow",
      });
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: position?.position,
        content: pinGlyph.element,
      });

      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(
          position.position.lat + ", " + position.position.lng
        );
        infoWindow.open(map, marker);
      });
      return marker;
    });

    // Request needed libraries.

    featureLayer = map.getFeatureLayer("ADMINISTRATIVE_AREA_LEVEL_2");
    new MarkerClusterer({ markers, map });
    // Add the event listeners for the feature layer.
    featureLayer.addListener("click", handleClick);
    featureLayer.addListener("mousemove", handleMouseMove);

    // Map event listener.
    map.addListener("mousemove", () => {
      // If the map gets a mousemove, that means there are no feature layers
      // with listeners registered under the mouse, so we clear the last
      // interacted feature ids.
      if (lastInteractedFeatureIds?.length) {
        lastInteractedFeatureIds = [];
        featureLayer.style = applyStyle;
      }
    });

    // Create the infowindow.
    infoWindows = new InfoWindow({});
    // Apply style on load, to enable clicking.
    featureLayer.style = applyStyle;
  }

  // Helper function for the infowindow.
  async function createInfoWindow(event: any) {
    let feature = event.features[0];
    if (!feature.placeId) return;

    // Update the infowindow.
    const place = await feature.fetchPlace();
    let content =
      '<span style="font-size:small">Display name: ' +
      place.displayName +
      "<br/> Place ID: " +
      feature.placeId +
      "<br/> Feature type: " +
      feature.featureType +
      "</span>";

    updateInfoWindow(content, event.latLng);
  }

  // Apply styles using a feature style function.
  function applyStyle(/* FeatureStyleFunctionOptions */ params: any) {
    const placeId = params.feature.placeId;

    //@ts-ignore
    console.log(placeId);
    if (lastClickedFeatureIds.includes(placeId)) {
      return styleClicked;
    }
    //@ts-ignore
    if (lastInteractedFeatureIds.includes(placeId)) {
      return styleMouseMove;
    }
    // styleBoundary(placeId);
    // return styleDefault;
  }
  function styleBoundary(selectedPlaceId: any) {
    // Define a style of transparent purple with opaque stroke.
    const styleFill = /** @type {!google.maps.FeatureStyleOptions} */ {
      strokeColor: "red",
      strokeOpacity: 1.0,
      strokeWeight: 3.0,
      fillColor: "#810FCB",
      fillOpacity: 0.5,
    };
    featureLayer.style = (params) => {
      return styleDefault; // Set to the default style for all boundaries
    };

    // Define the feature style function.
    featureLayer.style = (params) => {
      if (params.feature.placeId === selectedPlaceId) {
        return styleClicked; // Apply the custom style for the selected boundary
      }
    };
  }

  // Helper function to create an info window.
  function updateInfoWindow(content: any, center: any) {
    infoWindows.setContent(content);
    infoWindows.setPosition(center);
    infoWindows.open({
      shouldFocus: false,
    });
  }

  window.initMap = initMap;

  return (
    <div>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs&callback=initMap&libraries=places&v=weekly"
        defer
      ></Script>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>
      <Script src="https://kit.fontawesome.com/de6730f8c3.js"></Script>
      <div className="  ">
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
          </div>
        </div>
      </div>
      <div id="map"></div>
    </div>
  );
};

export default page;

// const [icons, setIcons] = useState<typeof import("react-icons/fa") | null>(
//     null
//   );

//   useEffect(() => {
//     import("react-icons/fa").then((mod) => setIcons(mod));
//   }, []);

//   if (!icons) return null;

//   const Icon = icons["FaBeer"];