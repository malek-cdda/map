export interface mapCenter {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  mapTypeControl: boolean;
}

export type typeValue = {
  streetNumber: any;
  route: any;
  city: any;
  zip: any;
  country: any;
  state: any;
};

export interface address {
  name: string;
  icon: string;
  address_components: {
    long_name: string | number;
    short_name: string | number;
    types: string[];
  }[];
  geometry?: {
    location?: {
      lat?: number | any;
      lng?: number | any;
    };
  };
}
export interface mapCenter {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  mapTypeControl: boolean;
}

export const properties = [
  {
    address: "215 Emily St, MountainView, CA",
    description: "Single family house with modern design",
    price: "$ 3,889,000",
    type: "home",
    bed: 5,
    bath: 4.5,
    size: 300,
    position: { lat: -31.56391, lng: 147.154312 },
  },
  {
    address: "108 Squirrel Ln &#128063;, Menlo Park, CA",
    description: "Townhouse with friendly neighbors",
    price: "$ 3,050,000",
    type: "building",
    bed: 4,
    bath: 3,
    size: 200,
    position: { lat: -33.718234, lng: 150.363181 },
  },
  {
    address: "100 Chris St, Portola Valley, CA",
    description: "Spacious warehouse great for small business",
    price: "$ 3,125,000",
    type: "warehouse",
    bed: 4,
    bath: 4,
    size: 800,
    position: { lat: -33.727111, lng: 150.371124 },
  },
  {
    address: "98 Aleh Ave, Palo Alto, CA",
    description: "A lovely store on busy road",
    price: "$ 4,225,000",
    type: "store-alt",
    bed: 2,
    bath: 1,
    size: 210,
    position: { lat: -33.848588, lng: 151.209834 },
  },
  {
    address: "2117 Su St, MountainView, CA",
    description: "Single family house near golf club",
    price: "$ 1,700,000",
    type: "home",
    bed: 4,
    bath: 3,
    size: 200,
    position: { lat: -33.851702, lng: 151.216968 },
  },
  {
    address: "197 Alicia Dr, Santa Clara, CA",
    description: "Multifloor large warehouse",
    price: "$ 5,000,000",
    type: "warehouse",
    bed: 5,
    bath: 4,
    size: 700,
    position: { lat: -34.671264, lng: 150.863657 },
  },
  {
    address: "700 Jose Ave, Sunnyvale, CA",
    description: "3 storey townhouse with 2 car garage",
    price: "$ 3,850,000",
    type: "building",
    bed: 4,
    bath: 4,
    size: 600,
    position: { lat: -35.304724, lng: 148.662905 },
  },
  {
    address: "868 Will Ct, Cupertino, CA",
    description: "Single family house in great school zone",
    price: "$ 2,500,000",
    type: "home",
    bed: 3,
    bath: 2,
    size: 100,
    position: { lat: -36.817685, lng: 175.699196 },
  },
  {
    address: "655 Haylee St, Santa Clara, CA",
    description: "2 storey store with large storage room",
    price: "$ 2,500,000",
    type: "store-alt",
    bed: 3,
    bath: 2,
    size: 450,
    position: { lat: -36.828611, lng: 175.790222 },
  },
  {
    address: "2019 Natasha Dr, San Jose, CA",
    description: "Single family house",
    price: "$ 2,325,000",
    type: "home",
    bed: 4,
    bath: 3.5,
    size: 500,
    position: { lat: -37.75, lng: 145.116667 },
  },
];

// Define styles.
// Stroke and fill with minimum opacity value.
export const styleDefault = {
  strokeColor: "#810FCB",
  strokeOpacity: 1.0,
  strokeWeight: 2.0,
  fillColor: "white",
  fillOpacity: 0.1, // Polygons must be visible to receive events.
};
// Style for the clicked polygon.
export const styleClicked = {
  ...styleDefault,
  fillColor: "#810FCB",
  fillOpacity: 0.5,
};
// Style for polygon on mouse move.
export const styleMouseMove = {
  strokeColor: "#810FCB",
  strokeOpacity: 1.0,

  fillColor: "white",
  strokeWeight: 4.0,
};
