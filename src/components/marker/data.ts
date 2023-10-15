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

export function buildContent(property: any) {
  const content = document.createElement("div");
  content.innerHTML = `
            <div class="icon">
             <span aria-hidden="true" class=" " title="${property?.price}">${property.price}</span>
                 <span class="fa-sr-only">${property?.position?.lat}</span>
            </div>
            <input  class="border bg-red-800 " />
            <div class="details  ">
                <div class="price">${property?.position?.lng}</div>
                <div class="address">${property?.title}</div>
            </div>
            `;
  return content;
}
