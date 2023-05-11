import styles from "../styles/comment.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { formatDistanceToNow, set } from "date-fns";
import { getAllComments } from "../actions/fetchActions";
import { addComment, deleteComment } from "../actions/commentActions";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Reply from "./Reply";

const Comment = ({ id }) => {
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [animationParent] = useAutoAnimate();
  const [replyForm, setReplyForm] = useState(false);
  const postId = id;
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const comments = await getAllComments(postId);
        console.log(comments);
        setAllComments(comments);
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(
      session,
      postId,
      comment,
      setIsSubmitting,
      setComment,
      setAllComments,
      allComments
    );
  };

  const handleCommentDelete = async (id) => {
    await deleteComment(postId, id, setAllComments, allComments);
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
      <div className={styles.commentList} ref={animationParent}>
        {loading && <div className={styles.loading}>Loading...</div>}
        {!loading &&
          allComments?.map((comment1) => {
            return (
              <div key={comment1?.id}>
                <div className={styles.comment}>
                  <span className={styles.commentUsername}>
                    {comment1?.user?.name}
                  </span>
                  <br />
                  <span className={styles.commentUsername}>
                    @{comment1?.user?.username}
                  </span>

                  {comment1.comment && (
                    <span className={styles.commentText}>
                      {comment1?.comment.text}
                    </span>
                  )}
                  <span className={styles.commentText}>{comment1?.text}</span>
                  <div className={styles.commentBottom}>
                    <span className={styles.commentDate}></span>
                    <button
                      className={styles.replyBtn}
                      onClick={() => {
                        setSelectedCommentId(comment1._id);
                        setReplyForm(!replyForm);
                      }}
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
                  {selectedCommentId === comment1._id && replyForm && (
                    <Reply
                      commentId={comment1._id}
                      postId={postId}
                      userId={session.user.id}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comment;
