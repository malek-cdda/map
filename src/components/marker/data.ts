export const markerData = [
  {
    position: { lat: 34.8791806, lng: -111.8265049 },
    title: "Boynton Pass",
    price: "123k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  },
  {
    position: { lat: 34.8559195, lng: -111.7988186 },
    title: "Airport Mesa",
    price: "223k",
    img: "/next.svg",
  },
  {
    position: { lat: 34.832149, lng: -111.7695277 },
    title: "Chapel of the Holy Cross",
    price: "444k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  },
  {
    position: { lat: 34.823736, lng: -111.8001857 },
    title: "Red Rock Crossing",
    price: "555k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  },
  {
    position: { lat: 34.800326, lng: -111.7665047 },
    title: "Bell Rock",
    price: "666k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  },
];

export function ZoomControl(controlDiv: any, map: any) {
  // Creating divs & styles for custom zoom control
  controlDiv.style.padding = "5px";

  // Set CSS for the control wrapper
  var controlWrapper = document.createElement("div");
  controlWrapper.className =
    "cursor-pointer border-1 text-center h-20 fixed bottom-1/2 right-10";
  controlDiv.appendChild(controlWrapper);
  // Set CSS for the zoomIn
  var zoomInButton = document.createElement("div");
  zoomInButton.style.width = "32px";
  zoomInButton.style.height = "32px";
  /* Change this to be the .png image you want to use */
  zoomInButton.style.background = "green";
  controlWrapper.appendChild(zoomInButton);

  // Set CSS for the zoomOut
  var zoomOutButton = document.createElement("div");
  zoomOutButton.style.background = "red";
  zoomOutButton.style.width = "32px";
  zoomOutButton.style.height = "32px";
  /* Change this to be the .png image you want to use */

  controlWrapper.appendChild(zoomOutButton);

  // Setup the click event listener - zoomIn
  google.maps.event.addDomListener(zoomInButton, "click", function () {
    map.setZoom(map.getZoom() + 1);
  });

  // Setup the click event listener - zoomOut
  google.maps.event.addDomListener(zoomOutButton, "click", function () {
    map.setZoom(map.getZoom() - 1);
  });
}
