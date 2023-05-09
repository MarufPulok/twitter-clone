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

export const fetchTweetAction = async (
  id,
  setName,
  setUsername,
  setDp,
  setText,
  setImages,
  setCreatedAt
) => {
  const res = await fetch(`/api/users/findTweet?tweetId=${id}`);
  const data = await res.json();

  setName(data.user.name);
  setUsername(data.user.username);
  setDp(data.user.dp);
  setText(data.tweet.text);
  setImages(data.tweet.images);
  setCreatedAt(data.tweet.createdAt);
};

export const getUserData = async (email) => {
  const res = await fetch(`/api/users/getUser?email=${email}`);
  const data = await res.json();
  return {
    dp: data?.user[0]?.dp,
    name: data?.user[0]?.name,
    username: data?.user[0]?.username,
  };
};

export const fetchPostsAction = async (page, setPosts, setLoading) => {
  try {
    setLoading(true);
    const res = await fetch(`/api/users/getAllTweets?page=${page}`);
    const data = await res.json();
    setPosts((prevPosts) => [...prevPosts, ...data.tweets]);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export const getUserInfo = async (userId) => {
  const res = await fetch(`/api/getUserInfo?id=${userId}`);
  const data = await res.json();
  return data.user;
};

export const fetchFollowers = async (userId) => {
  const res = await fetch(`/api/getFollowers?id=${userId}`);
  const data = await res.json();
  return data.followers;
};

export const fetchFollowing = async (userId) => {
  const res = await fetch(`/api/getFollowing?id=${userId}`);
  const data = await res.json();
  return data.following;
};

export const fetchProfilePicture = async (email) => {
  const res = await fetch(`/api/users/getUser?email=${email}`);
  const data = await res.json();
  return data.user[0]?.dp;
};

export const getAllComments = async (postId) => {
  try {
    const res = await fetch(`/api/users/getAllComments?tweetId=${postId}`);
    const data = await res.json();
    return data.tweetComments;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
