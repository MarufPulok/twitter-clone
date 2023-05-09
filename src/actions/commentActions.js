export const addComment = async (
  session,
  postId,
  comment,
  setIsSubmitting,
  setComment,
  setAllComments,
    allComments
) => {
  if (!comment) return;
  setIsSubmitting(true);
  try {
    const res = await fetch(`/api/users/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        tweetId: postId,
        text: comment,
      }),
    });
    const data = await res.json();
    console.log(data)
    setComment("");
    setIsSubmitting(false);
    setAllComments([...allComments, data]);
  } catch (error) {
    console.error(error);
    // Add error handling here
  }
};

export const deleteComment = async (postId, commentId, setAllComments, allComments) => {
    try {
      const res = await fetch(`/api/users/deleteComment`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweetId: postId,
          commentId: commentId,
        }),
      });
      const data = await res.json();
      console.log(data);
      setAllComments(allComments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };
  
