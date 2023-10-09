"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
let panorama: google.maps.StreetViewPanorama;

// StreetViewPanoramaData of a panorama just outside the Google Sydney office.
let outsideGoogle: google.maps.StreetViewPanoramaData;

let map: google.maps.Map;

const Home = () => {
  const [latlng, setLatLng] = useState({
    name: "abdul karim",
    position: { lat: 37.86926, lng: -122.254811 },
    price: "sd",
    address: "come to mirpur",
  });

  function initMap(): void {
    const berkeley = { lat: 37.869085, lng: -122.254775 };
    const sv = new google.maps.StreetViewService();

    panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano") as HTMLElement
    );

    // Set up the map.
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: berkeley,
      zoom: 16,
      streetViewControl: false,
    });

    // Set the initial Street View camera to the center of the map
    sv.getPanorama({ location: berkeley, radius: 50 }).then(processSVData);

    // Look for a nearby Street View panorama when the map is clicked.
    // getPanorama will return the nearest pano when the given
    // radius is 50 meters or less.
    map.addListener("click", (event: any) => {
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
  }, [router]);
  return (
    <div>
      {/* <div id="street-view" className="h-[700px]"></div> */}
      <div id="map" className="h-[100px] w-1/2"></div>
      <div id="pano" className="h-[300px] w-1/2"></div>
    </div>
  );
};

export default Home;
