const editPostAction = async (id, content) => {
    try {
      const response = await fetch(`/api/users/editTweet`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweetId: id, text: content }),
      });
      const data = await response.json();
      return { type: "success", text: "Post updated successfully" };
    } catch (error) {
      console.error(error);
      return { type: "error", text: "Something went wrong" };
    }
  };
  
  export default editPostAction;
  