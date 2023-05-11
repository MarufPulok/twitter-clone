import styles from "../styles/delete.module.css";
import { useRouter } from "next/router";
import { deleteTweet } from "../actions/postActions";

const DeleteConfirmation = () => {
  const router = useRouter();
  const postId = router.query.id;

  const handleDelete = async () => {
    try {
      const data = await deleteTweet(postId);
      console.log(data);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <h2 className={styles.deleteText}>
        Are you sure you want to delete this post?
      </h2>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        Delete
      </button>
      <button className={styles.cancelBtn} onClick={() => router.push("/")}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteConfirmation;
