export const updateProfile = async (userId, name, username, email) => {
  const response = await fetch(`/api/updateProfile?id=${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, email }),
  });
  const data = await response.json();
  return data;
};
