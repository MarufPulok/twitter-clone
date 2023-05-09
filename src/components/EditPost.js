import styles from "../styles/editPost.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [message, setMessage] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/users/getPostById?id=${id}`);
          const data = await response.json();
          console.log(data)
          setContent(data.tweet.text);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPost();
      
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/users/editTweet`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweetId: id, text: content }),
      });
      const data = await response.json();
      console.log(data);
      setMessage({ type: "success", text: "Post updated successfully" });
    }
    catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Something went wrong" });
    }
  }

  return (
    <div className={styles.container}>
      <h2>Edit Tweet</h2>
      {message && (
        <div className={`message ${message.type}`}>
          <p className={styles.msg}>{message.text}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.formLabel}>
            Tweet:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className={styles.tweet}
          ></textarea>
        </div>
        <button type="submit" className={styles.btn}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPost;
