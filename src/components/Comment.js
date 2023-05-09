import styles from "../styles/comment.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ id }) => {
  // const router = useRouter();
  const postId = id;
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/users/getAllComments?tweetId=${postId}`);
        const data = await res.json();
        setAllComments(data.tweetComments);
      } catch (error) {
        
      }
    };

    getComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setComment("");
      setIsSubmitting(false);
      setAllComments(allComments.concat(data.comment));
    } catch (error) {
      console.error(error);
      // Add error handling here
    }
  };

  const handleCommentDelete = async (id) => {
    try {
      const res = await fetch(`/api/users/deleteComment`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweetId: postId,
          commentId: id,
        }),
      });
      const data = await res.json();
      console.log(data);
      setAllComments(allComments.filter((comment) => comment._id !== id));
    } catch (error) {
      console.error(error);
      // Add error handling here
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.commentInput}>
        <textarea
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className={styles.commentButton}>
        <button className={styles.btn} onClick={handleSubmit}>
          {isSubmitting ? "Please Wait..." : "Comment"}
        </button>
      </div>
      <div className={styles.commentList}>
        {allComments?.map((comment1) => {
          return (
            <div key={comment1.id}>
              <div className={styles.comment}>
              <span className={styles.commentUsername}>
                  {comment1?.user.name}
                </span>
                <br />
                <span className={styles.commentUsername}>
                  @{comment1?.user?.username}
                </span>

                <span className={styles.commentText}>
                  {comment1.text}
                </span>
                <div className={styles.commentBottom}>
                  <span className={styles.commentDate}>
                    
                    
                  </span>
                  <button
                    className={styles.replyBtn}
                    onClick={() =>
                      router.push(`/?modal=reply&id=${comment1._id}`)
                    }
                  >
                    Reply
                  </button>
                  <button className={styles.replyBtn}>Edit</button>
                  <button
                    className={styles.replyBtn}
                    onClick={() => {
                      handleCommentDelete(comment1._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
