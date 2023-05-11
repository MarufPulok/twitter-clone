// EditProfile.js

import { useEffect, useState } from "react";
import styles from "../styles/editProfile.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { updateProfile } from "../actions/editProfileAction";
import { getUserInfo } from "../actions/fetchActions";

const EditProfile = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserInfo(userId);
      setName(user?.name);
      setUsername(user?.username);
      setEmail(user?.email);
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await updateProfile(userId, name, username, email);
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Something went wrong" });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Profile</h2>
      {message && (
        <div className={`message ${message.type}`}>
          <p className={styles.msg}>{message.text}</p>
        </div>
      )}
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <label className={styles.editFormLabel}>
          Name:
          <input
            type="text"
            className={styles.editFormInput}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className={styles.editFormLabel}>
          Username:
          <input
            type="text"
            className={styles.editFormInput}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className={styles.editFormLabel}>
          Email:
          <input
            type="email"
            className={styles.editFormInput}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button type="submit" className={styles.btn}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
