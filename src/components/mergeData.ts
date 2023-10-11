let map: google.maps.Map;
export function variableDelareMethod() {
  map = new google.maps.Map(document.getElementById("map")!, {
    zoom: 4,
    center: { lat: 3, lng: 3 },
  });
  const input = document.getElementById("country-input") as HTMLElement;
  return { map, input };
}
