// Function to get address using latitude and longitude
export async function getAddress({ latitude, longitude }) {
  // Sending a GET request to the reverse geocoding API with latitude and longitude parameters
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );

  // Checking if the response is not okay (status code is not in the range 200-299)
  if (!res.ok) throw Error("Failed getting address"); // Throwing an error if response is not okay

  // Parsing the response body as JSON
  const data = await res.json();

  // Returning the retrieved address data
  return data;
}

