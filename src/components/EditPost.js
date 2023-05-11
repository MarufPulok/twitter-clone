import styles from "../styles/editPost.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import editPostAction from "../actions/editPostAction";
import {fetchPostByIdAction} from "../actions/fetchActions";

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [message, setMessage] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const postContent = await fetchPostByIdAction(id);
        setContent(postContent);
        console.log(content)
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = await editPostAction(id, content);
    setMessage(message);
  };

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
