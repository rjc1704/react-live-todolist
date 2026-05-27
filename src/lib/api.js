const BASE_URL = "https://assignment-todolist-api.vercel.app";
const TENANT_ID = import.meta.env.VITE_TENANT_ID;

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}/api/${TENANT_ID}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json();
}

export const getItems = (page = 1, pageSize = 100) =>
  request(`/items?page=${page}&pageSize=${pageSize}`);

export const getItem = (id) => request(`/items/${id}`);

export const createItem = (name) =>
  request("/items", {
    method: "POST",
    body: JSON.stringify({ name }),
  });

export const updateItem = (id, data) =>
  request(`/items/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteItem = (id) => request(`/items/${id}`, { method: "DELETE" });

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${BASE_URL}/api/${TENANT_ID}/images/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json();
};
