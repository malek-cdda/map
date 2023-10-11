let map: google.maps.Map;
export function variableDelareMethod() {
  // map is a google build in method
  map = new google.maps.Map(document.getElementById("map")!, {
    zoom: 4,
    center: { lat: 3, lng: 3 },
  });
  //   get input all attribute element get here
  const input = document.getElementById("country-input") as HTMLInputElement;
  //   infowindo show map area display it
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
  const infowindow: any = new google.maps.InfoWindow();
  //   find marker
  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });
  //   autocomplete option need
  const options = {
    fields: ["address_components", "geometry", "icon", "name", "place_id"],
    strictBounds: false,
  };
  // find place library  = autcomplete
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.bindTo("bounds", map);

  return { map, input, autocomplete, infowindow, marker };
}

export const placeFind = (
  map: any,
  autocomplete: any,
  infowindow: any,
  marker: any
) => {
  const place = autocomplete.getPlace();
  console.log(place);
  if (!place?.geometry?.location) {
    window.alert("wrong address");
    return place;
  }
  map.setCenter(place?.geometry?.location);
  infowindow.open(map);
  marker.setPosition(place?.geometry?.location);
  marker.setVisible(true);
  return;
};
