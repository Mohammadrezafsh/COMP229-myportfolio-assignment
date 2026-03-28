const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://comp229-assignment2-backend-pjr4.onrender.com";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export async function getItems(resource) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}`);
  return handleResponse(response);
}

export async function getItemById(resource, id) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/${id}`);
  return handleResponse(response);
}

export async function createItem(resource, payload) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function updateItem(resource, id, payload) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function deleteItem(resource, id) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

export { API_BASE_URL };