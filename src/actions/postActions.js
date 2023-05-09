export const likeUnlikeTweet = async (postId, session, setIsLiked, setLike) => {
  try {
    const res = await fetch(`/api/users/likeUnlike`, {
      method: "POST",
      body: JSON.stringify({ tweetId: postId, userId: session?.user?.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    if (data.message === "Post liked") {
      setIsLiked(true);
      setLike((prevLike) => prevLike + 1);
    } else {
      setIsLiked(false);
      setLike((prevLike) => prevLike - 1);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const reTweet = async (postId, userId, text) => {
  try {
    const res = await fetch(`/api/users/reTweet`, {
      method: "POST",
      body: JSON.stringify({ tweetId: postId, userId, text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};


export const deleteTweet = async (postId) => {
  const res = await fetch(`/api/users/deleteTweet`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tweetId: postId }),
  });

  const data = await res.json();
  console.log(data);
  return data;
};

