export const createTweet = async (email, text, postImages) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("text", text);
  postImages?.forEach((image) => {
    formData.append("postImages", image);
  });

  const res = await fetch("/api/users/createTweet", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data.newTweet;
};

  