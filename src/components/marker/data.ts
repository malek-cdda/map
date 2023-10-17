import Custome from "@/components/customeCard/Custome";

export const markerData = [
  {
    position: { lat: 34.8791806, lng: -111.8265049 },
    title: "Boynton Pass",
    price: "123k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "Arizona",
  },
  {
    position: { lat: 34.8559195, lng: -111.7988186 },
    title: "Airport Mesa",
    price: "223k",
    img: "/next.svg",
    state: "California",
  },
  {
    position: { lat: 34.832149, lng: -111.7695277 },
    title: "Chapel of the Holy Cross",
    price: "444k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "Krasnoyarsk Krai",
  },
  {
    position: { lat: 34.823736, lng: -111.8001857 },
    title: "Red Rock Crossing",
    price: "555k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "California",
  },
  {
    position: { lat: 34.800326, lng: -111.7665047 },
    title: "Bell Rock",
    price: "666k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "Arizona",
  },
];

// export function ZoomControl(controlDiv: any, map: any) {
//   // Creating divs & styles for custom zoom control
//   controlDiv.style.padding = "5px";

//   // Set CSS for the control wrapper
//   var controlWrapper = document.createElement("div");
//   controlWrapper.className =
//     "cursor-pointer border-1 text-center h-20 fixed bottom-1/2 right-10";
//   controlDiv.appendChild(controlWrapper);
//   // Set CSS for the zoomIn
//   var zoomInButton = document.createElement("div");
//   zoomInButton.style.width = "32px";
//   zoomInButton.style.height = "32px";
//   /* Change this to be the .png image you want to use */
//   zoomInButton.style.background = "green";
//   controlWrapper.appendChild(zoomInButton);

//   // Set CSS for the zoomOut
//   var zoomOutButton = document.createElement("div");
//   zoomOutButton.style.background = "red";
//   zoomOutButton.style.width = "32px";
//   zoomOutButton.style.height = "32px";
//   /* Change this to be the .png image you want to use */

//   controlWrapper.appendChild(zoomOutButton);

//   // Setup the click event listener - zoomIn
//   google.maps.event.addDomListener(zoomInButton, "click", function () {
//     map.setZoom(map.getZoom() + 1);
//   });

//   // Setup the click event listener - zoomOut
//   google.maps.event.addDomListener(zoomOutButton, "click", function () {
//     map.setZoom(map.getZoom() - 1);
//   });
// }

// component rendering
//  custom rendering system
export async function markerCustom(
  params: any,
  map: any,
  toggle: any,
  PinElement: any,
  infoWindow: any
) {
  markerData.forEach((items) => {
    const { position, price, title, img } = items;
    // customer marker design for every user
    const beachFlagImg = document.createElement("img");
    beachFlagImg.src = `${img}`;
    beachFlagImg.className = "absolute top-0 w-25 h-25";
    const priceTag = document.createElement("div");
    priceTag.className =
      "bg-red-800 w-15 h-5 pt-1 rounded-full px-4 text-white relative";
    priceTag.textContent = price;
    priceTag.appendChild(beachFlagImg);
    //   pinelement set for change marker design
    const pinScaled = new PinElement({
      scale: 1.5,
      glyph: `${price}`,
      glyphColor: "green",
      background: "yellow",
    });
    const marker = new params({
      map,
      position,
      content: toggle ? pinScaled?.element : priceTag,
    });
    marker.addListener("click", (e: any) => {
      infoWindow.setContent(items.title);
      infoWindow.open(marker.map, marker);
    });
  });
}

// zoom in out control click
export async function findProperty(
  value: any,
  setState: any,
  map: any,
  infoWindow: any
) {
  map.addListener(value, (e: any) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: map?.center?.lat(), lng: map?.center?.lng() } },
      (results: any, status) => {
        const addressComponents = results[0].address_components;
        for (const component of addressComponents) {
          if (component.types.includes("administrative_area_level_1")) {
            const state = component.long_name;
            setState(state);
            // console.log("State:", state);
            // infoWindow?.open();
          }
        }
      }
    );
  });
}

// auto search to find place
export const placeFind = (
  map: any,
  autocomplete: any,
  infowindow: any,
  marker: any,
  setState: any
) => {
  const place = autocomplete.getPlace();
  if (!place?.geometry?.location) {
    window.alert("wrong address");
    return place;
  }
  const addressComponents = place.address_components;
  for (const component of addressComponents) {
    if (component.types.includes("administrative_area_level_1")) {
      const state = component.long_name;
      setState(state);
      // console.log("State:", state);
      // infoWindow?.open();
    }
  }
  // map.setCenter(place?.geometry?.location);
  // infowindow.open(map);
  marker.setPosition(place?.geometry?.location);
  // return place?.geometry?.location;
  return {
    lat: place?.geometry?.location.lat(),
    lng: place?.geometry?.location.lng(),
  };
  // marker.setVisible(true);
  // return;
  // const geocoder = new google.maps.Geocoder();
  // geocoder.geocode(
  //   { location: { lat: map?.center?.lat(), lng: map?.center?.lng() } },
  //   (results: any, status) => {
  //     // console.log(results[0]);
  //     // setProperty(results);
  //     const addressComponents = results[0].address_components;
  //     console.log(addressComponents);
  //     for (const component of addressComponents) {
  //       if (component.types.includes("administrative_area_level_1")) {
  //         const state = component.long_name;
  //         setState(state);
  //         console.log("State:", state);
  //       }
  //     }
  //   }
  // );
  // map.setCenter({ lat: map?.center?.lat(), lng: map?.center?.lng() });
};
