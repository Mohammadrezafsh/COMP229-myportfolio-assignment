const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://comp229-assignment2-backend-pjr4.onrender.com";

const AUTH_STORAGE_KEY = "portfolio_auth";

function getStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getAuthHeaders() {
  const auth = getStoredAuth();
  const headers = {
    "Content-Type": "application/json",
  };

  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }

  return headers;
}

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export async function signIn(credentials) {
  const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return handleResponse(response);
}

export async function signUp(payload) {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function getItems(resource) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}`);
  return handleResponse(response);
}

export async function createItem(resource, payload) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function updateItem(resource, id, payload) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function deleteItem(resource, id) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}

export { API_BASE_URL, AUTH_STORAGE_KEY };
