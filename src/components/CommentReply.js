import { useRouter } from "next/router";
import styles from "../styles/comment.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { formatDistanceToNow } from "date-fns";

const CommentReply = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const router = useRouter();
  const id = router.query.id;
  const [replyNum, setReplyNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      const res = await fetch(`/api/getCommentById?id=${id}`);
      const data = await res.json();

      const res1 = await fetch(
        `/api/getUserById?id=${data.comment.commentAuthor}`
      );
      const data1 = await res1.json();
      setName(data1.user.username);
      setComment(data.comment.commentContent);
      setReplyNum(data.comment.commentReplies.length);
    };

    const fetchReplies = async () => {
      const res = await fetch(`/api/getAllReplies?id=${id}`);
      const data = await res.json();
      console.log(data);
      setReplies(data.replies);
      console.log(replies);
    };
    fetchComment();
    fetchReplies();
  }, [replies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reply) return;
    setLoading(true);
    const res = await fetch(`/api/addReply?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        commentContent: reply,
      }),
    });
    const data = await res.json();
    console.log(data);
    setReply("");
    setLoading(false);
  };

  return (
    <>
      <div className={styles.comment}>
        <h3>Replying to...</h3>
        <span className={styles.commentUsername}>@{name}</span>
        <span className={styles.commentText}>{comment}</span>
      </div>
      <div className={styles.container}>
        <div className={styles.commentInput}>
          <textarea
            type="text"
            placeholder="Add a reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </div>
        <div className={styles.commentButton}>
          <button className={styles.btn} onClick={handleSubmit}>
            {loading ? "Loading..." : "Reply"}
          </button>
        </div>
        <div className={styles.comment}>
          <span>{replyNum} replies...</span>
          <br />
          {replies.map((reply, index) => (
            <React.Fragment key={index}>
              <span className={styles.commentUsername}>@{reply.commentAuthor?.username}</span>
              <span className={styles.commentText}>{reply.commentContent}</span>
              <div className={styles.commentBottom}>
                <span className={styles.commentDate}>{formatDistanceToNow(new Date(reply.commentCreatedAt))}{" "}
                      ago</span>
              </div>
            </React.Fragment>
          ))}


        </div>
      </div>
    </>
  );
};

export default CommentReply;
