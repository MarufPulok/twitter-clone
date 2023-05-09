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
    setAllComments(allComments.concat(data.comment));
  } catch (error) {
    console.error(error);
    // Add error handling here
  }
};
