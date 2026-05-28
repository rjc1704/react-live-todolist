const TENANT_ID = "react-todo-live";
const BASE_URL = "https://assignment-todolist-api.vercel.app";

export const updateTodo = async (id, data) => {
  const response = await fetch(`${BASE_URL}/api/${TENANT_ID}/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("updateTodo 실패");
  }
  const updatedData = await response.json();
  return updatedData;
};

export const postTodo = async (title) => {
  const response = await fetch(`${BASE_URL}/api/${TENANT_ID}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: title }),
  });
  if (!response.ok) {
    throw new Error("fetchTodos 실패");
  }
  const data = await response.json();
  return data;
};
