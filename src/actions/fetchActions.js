export const fetchPostByIdAction = async (id) => {
  try {
    const response = await fetch(`/api/users/getPostById?id=${id}`);
    const data = await response.json();
    return data.tweet.text;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const getUserInfo = async (userId) => {
  const res = await fetch(`/api/getUserInfo?id=${userId}`);
  const data = await res.json();
  return data.user;
};



export const fetchFollowers = async (userId) => {
  const res = await fetch(`/api/getFollowers?id=${userId}`)
  const data = await res.json()
  return data.followers
}

export const fetchFollowing = async (userId) => {
  const res = await fetch(`/api/getFollowing?id=${userId}`)
  const data = await res.json()
  return data.following
}

export const fetchProfilePicture = async (email) => {
  const res = await fetch(`/api/users/getUser?email=${email}`)
  const data = await res.json()
  return data.user[0]?.dp
}