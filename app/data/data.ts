export const CamsExample = [
  {
    cam_id: 0,
    location: { latitude: 42.360092, longitude: -71.094162 },
    last_ping: 1726336914887,
    highlight: true,
  },
  {
    cam_id: 1,
    location: { latitude: -1.731188, longitude: 37.759447 },
    last_ping: 1726336914887,
    highlight: false,
  },
];

export const DataStreamExample = [
  {
    _id: "jn744dd2e2mjkf70b9pjr1xd1h70ssyc",
    cam_id: 0,
    alert_type: "suspicious vehicle",
    animal: "squink",
    num_animal: 4,
    ping_time: 4042326000,
  },
  {
    _id: "jn744dd2e2mjkf70b9pjr1xd1h70ssyd",
    cam_id: 0,
    alert_type: "poach",
    animal: "choncc",
    num_animal: 3,
    ping_time: 494232936040,
  },
  {
    _id: "jn744dd2e2mjkf70b9pjr1xd1h70ssye",
    cam_id: 1,
    alert_type: "",
    animal: "pengu",
    num_animal: 3,
    ping_time: 404330,
  },
];

export const dynamic = "force-dynamic"; // Ensure server-side rendering for dynamic content

const extractCityStateCountry = (addressComponents: any) => {
  let city = "";
  let state = "";
  let country = "";

  addressComponents.forEach((component: any) => {
    if (component.types.includes("locality")) {
      city = component.long_name; // City
    } else if (component.types.includes("administrative_area_level_1")) {
      state = component.long_name; // State
    } else if (component.types.includes("country")) {
      country = component.long_name; // Country
    }
  });

  // Return as a formatted string, filtering out any empty values
  return [city, state, country].filter(Boolean).join(", ");
};

// Server Action for reverse geocoding
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch from Google Maps API: ${res.statusText}`);
  }

  const data = await res.json();

  if (data.status === "OK" && data.results.length > 0) {
    const addressComponents = data.results[0].address_components;
    const formattedAddress = extractCityStateCountry(addressComponents);

    if (formattedAddress) {
      return formattedAddress;
    } else {
      console.warn("Formatted address is undefined or empty");
      return "Address not available";
    }
  } else {
    console.warn("Address not found or failed to fetch");
    return "Address not available";
  }
}

export async function getDataStreams(payload: object): Promise<any> {
  const apiUrl = "https://kindred-ocelot-952.convex.site/getDataStreams";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function listCameras(payload: object): Promise<any> {
  const apiUrl = "https://kindred-ocelot-952.convex.site/listCameras";

  try {
    console.log("Sending request to", apiUrl, "with payload:", payload);
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
