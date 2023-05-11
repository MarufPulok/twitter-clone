const BASE_URL = '/api';

export const fetchUserPosts = async (id) => {
  const res = await fetch(`${BASE_URL}/getUserPost?id=${id}`);
  const data = await res.json();
  return data.posts;
};

export const fetchUserInfo = async (id) => {
  const res = await fetch(`${BASE_URL}/getUserInfo?id=${id}`);
  const data = await res.json();
  return data.user;
};


export const uploadDp = (email, dp) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("dp", dp);
    
    return fetch("/api/uploadDp", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => data.dp)
      .catch(err => {
        console.error("Error uploading profile picture: ", err);
        return null;
      });
  };
  