import { useEffect, useState } from "react";
import styles from "../styles/comment.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Reply = ({ commentId, postId, userId }) => {
  const [animationParent] = useAutoAnimate();
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchReplies = async () => {
      try {
        const replies = await fetch(
          `/api/users/getAllReplies?commentId=${commentId}`
        );
        const data = await replies.json();
        console.log(data);
        setReplies(data.commentReplies);
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchReplies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const replyData = {
      userId,
      tweetId: postId,
      commentId,
      text: reply,
    };

    try {
      const res = await fetch(`/api/users/addReply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(replyData),
      });
      const data = await res.json();
      setReplies([...replies, data]);
      console.log(replies);
    } catch (error) {}

    setReply("");
  };

  return (
    <div className={styles.replyContainer}>
      <form onSubmit={handleSubmit} className={styles.replyForm}>
        <textarea
          type="text"
          placeholder="Write your reply..."
          value={reply}
          className={styles.replyInput}
          onChange={(e) => setReply(e.target.value)}
        />
        <button type="submit" className={styles.replySubmit}>
          Reply
        </button>
      </form>
      <div ref={animationParent}>
        {loading ? (
          <div>Loading...</div>
        ) : replies?.length === 0 ? (
          <div>No replies yet.</div>
        ) : (
          replies.map((reply, index) => (
            <div className={styles.comment} key={index}>
              {reply.user && (
                <span className={styles.commentUsername}>
                  {reply?.user?.name}
                </span>
              )}
              {!reply.user && (
                <span className={styles.commentUsername}>
                  {reply?.reply?.user.name}
                </span>
              )}
              <br />
              <span className={styles.commentUsername}>
                @{reply?.user?.username || reply?.reply?.user.username}
              </span>
              <span className={styles.commentText}>
                {reply?.text || reply?.reply?.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reply;
