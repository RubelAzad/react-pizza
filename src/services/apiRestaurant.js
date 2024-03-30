const API_URL = "https://react-fast-pizza-api.onrender.com/api"; // API base URL

// Function to get the menu from the API
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`); // Fetching menu data from the API

  // Checking if the response is not okay (status code is not in the range 200-299)
  if (!res.ok) throw Error("Failed getting menu"); // Throwing an error if response is not okay

  const { data } = await res.json(); // Parsing the response body as JSON
  return data; // Returning the menu data
}

// Function to get an order by its ID from the API
export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`); // Fetching order data from the API
  if (!res.ok) throw Error(`Couldn't find order #${id}`); // Throwing an error if response is not okay

  const { data } = await res.json(); // Parsing the response body as JSON
  return data; // Returning the order data
}

// Function to create a new order in the API
export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder), // Converting new order object to JSON string
      headers: {
        "Content-Type": "application/json", // Setting content type header to JSON
      },
    });

    if (!res.ok) throw Error(); // Throwing an error if response is not okay

    const { data } = await res.json(); // Parsing the response body as JSON
    return data; // Returning the created order data
  } catch {
    throw Error("Failed creating your order"); // Catching any errors during the process and throwing a custom error
  }
}

// Function to update an existing order in the API
export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj), // Converting update object to JSON string
      headers: {
        "Content-Type": "application/json", // Setting content type header to JSON
      },
    });

    if (!res.ok) throw Error(); // Throwing an error if response is not okay
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order"); // Catching any errors during the process and throwing a custom error
  }
}
