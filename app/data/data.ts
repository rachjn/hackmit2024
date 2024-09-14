export const CamsExample = [
  {
    cam_id: 0,
    location: { latitude: 42.360092, longitude: -71.094162 },
    last_ping: 1726336914887,
  },
  {
    cam_id: 1,
    location: { latitude: -1.731188, longitude: 37.759447 },
    last_ping: 1726336914887,
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
export async function reverseGeocode(lat: number, lng: number) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status === "OK" && data.results.length > 0) {
    const addressComponents = data.results[0].address_components;
    const formattedAddress = extractCityStateCountry(addressComponents);

    return formattedAddress; // Return the single string with city, state, and country
  } else {
    throw new Error("Address not found or failed to fetch");
  }
}
