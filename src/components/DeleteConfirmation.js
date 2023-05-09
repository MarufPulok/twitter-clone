import styles from "../styles/delete.module.css";
import { useRouter } from "next/router";

const DeleteConfirmation = () => {
  const router = useRouter();
  const postId = router.query.id;

  const handleDelete = async () => {
    const res = await fetch(`/api/users/deleteTweet`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweetId: postId }),
    });
    
    const data = await res.json();
    console.log(data);
    router.back();
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
