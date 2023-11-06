export async function autoCompleteDeclare(
  marker: any,
  map: any,
  infoWindow: any
) {
  const input = document.getElementById("pac-input") as HTMLInputElement;
  const options = {
    fields: ["address_components", "geometry", "icon", "name", "place_id"],
    strictBounds: false,
  };
  // find place library  = autcomplete
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    console.log(place);
    if (!place?.geometry?.location) {
      window.alert("wrong address");
      return place;
    }
    marker.setPosition(place.geometry.location);
    map.setCenter(place.geometry.location);
    infoWindow.setPosition(place.geometry.location);
    infoWindow.setContent(place?.name);
    infoWindow.open(map);
  });
  return;
}

export async function streetViewDeclare(map: any, product: any, setError: any) {
  const sv = new google.maps.StreetViewService();
  sv.getPanorama({ location: product.position, radius: 50 }).then(
    processSVData
  );
  map.addListener("click", (event: any) => {
    sv.getPanorama({ location: event.latLng, radius: 50 })
      .then((e) => {
        setError(true);
        processSVData;
      })
      .catch((e: any) =>
        // console.error("Street View data not found for this location.")
        {
          setError(false);
          console.log(e.message);
          // setError(false);
          window.alert("Street View data not found for this location.");
        }
      );
  });
}

async function processSVData({ data }: google.maps.StreetViewResponse) {
  let panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano") as HTMLElement
  );
  const location = data.location!;
  console.log(location);
  panorama.setPano(location.pano as string);
  panorama.setPov({
    heading: 270,
    pitch: 0,
  });
  panorama.setVisible(true);
  // map.addListener("click", () => {
  //   const markerPanoID = location.pano;
  //   // Set the Pano to use the passed panoID.
  //   panorama.setPano(markerPanoID as string);
  //   panorama.setPov({
  //     heading: 270,
  //     pitch: 0,
  //   });
  //   panorama.setVisible(true);
  // });
}
