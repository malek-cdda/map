"use client";
import { useEffect, useState } from "react";
import { propertyData } from "./data";
import { useRouter } from "next/navigation";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { FaBeer } from "react-icons/fa";
let panorama: google.maps.StreetViewPanorama;
let map: google.maps.Map;

declare global {
  interface Window {
    initMap: () => void;
  }
}
const Home = () => {
  // const [singlePropertyData, setSinglePropertyData] = useState<any>({});
  const [latlng, setLatLng] = useState({
    name: "abdul karim",
    position: { lat: -35.304724, lng: 148.662905 },
    price: "sd",
    address: "come to mirpur",
  });

  async function initMap(): Promise<void> {
    // map is build in method to show map in window display
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: latlng.position,
        zoom: 3,
        mapId: "d",
      }
    );

    // display show given location  == infowindow
    let infoWindow = new google.maps.InfoWindow({
      content: buildContent(latlng),
      position: latlng.position,
    });
    // show position on a map = AdvancedMarkerElement
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;
    const draggableMarker = new AdvancedMarkerElement({
      map,
      position: { lat: 37.39094933041195, lng: -122.02503913145092 },
      gmpDraggable: true,
      title: "This marker is draggable.",
    });
    draggableMarker.addListener("dragend", (event: any) => {
      console.log(event);
      const position = draggableMarker.position as google.maps.LatLng;
      console.log(position.lng);
      infoWindow.close();
      // infoWindow.setContent(`Pin dropped at: ${position.lat}, ${position.lng}`);
      infoWindow.open(draggableMarker.map, draggableMarker);
    });
    infoWindow.open(map);
    const markers = buildCluster(infoWindow, map);

    new MarkerClusterer({ markers, map });
    // street view function call from here

    try {
      streetView(map);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  //   cluster method
  function buildCluster(infoWindow: any, map: any): any {
    const markers = propertyData.map((item, i) => {
      const pinGlyph = new google.maps.marker.PinElement({
        glyph: "sdf",
        glyphColor: "green",
        borderColor: "yellow",
      });
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: item?.position,
        content: pinGlyph.element,
      });

      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(item?.position.lat + ", " + item.position.lng);
        infoWindow.open(map, marker);
      });
      return marker;
    });
    return markers;
  }
  // custom hover component for exact location
  function buildContent(property: any) {
    console.log(property);
    const content = document.createElement("div");
    content.innerHTML = `
          <div class="icon">
           ${(<FaBeer />)}
           <i aria-hidden="true" class="fa fa-icon fa-home text-3xl" title="${
             property.type
           }"></i>
               <span class="fa-sr-only">${property.type}</span>
          </div>
          <div class="details  ">
              <div class="price">${property.price}</div>
              <div class="address">${property.address}</div>
              <div class="features">
              <div>
                  <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
                  <span class="fa-sr-only">bedroom</span>
                
              </div>
              <div>
                  <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
                  <span class="fa-sr-only">bathroom</span>
               
              </div>
              <div>
                  <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
                  <span class="fa-sr-only">size</span>
               
              </div>
              </div>
          </div>
          `;
    return content;
  }
  // find street or place view
  function streetView(map: any) {
    const sv = new google.maps.StreetViewService();
    panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano") as HTMLElement
    );

    sv.getPanorama({ location: latlng.position, radius: 50 })
      .then(processSVData)
      .catch((e) => console.log("not foun street"));
    map.addListener("click", (event: any) => {
      console.log(event);
      sv.getPanorama({ location: event.latLng, radius: 50 })
        .then(processSVData)
        .catch((e) =>
          console.error("Street View data not found for this location.")
        );
    });
  }
  function processSVData({ data }: google.maps.StreetViewResponse) {
    const location = data.location!;
    const marker = new google.maps.Marker({
      position: location.latLng,
      map,
      title: location.description,
    });
    panorama.setPano(location.pano as string);
    panorama.setPov({
      heading: 270,
      pitch: 0,
    });
    panorama.setVisible(true);
    marker.addListener("click", () => {
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
      <section className="flex flex-wrap justify-between gap-3 px-5 h-full">
        {propertyData.map((item: any, index) => (
          <div
            id="input-1"
            key={index}
            className="bg-green-500 text-white"
            onMouseMove={(e) => {
              setLatLng(item);
              //   console.log(item.position);
              //   window.initMap = initMap;
            }}
          >
            <h1 className="bg-red-700"> {item.address}</h1>
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
      <div id="pano" className="h-[1100px] w-1/2"></div>
    </div>
  );
};

export default Home;
