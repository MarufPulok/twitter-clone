import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/editProfile.module.css";
import useSWR from "swr";

import { useSession } from "next-auth/react";

const EditProfile = () => {
  const { data: session} = useSession();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const userId = session?.user?.id;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/getUserInfo?id=${userId}`);
      const data = await res.data;
      setName(data.user.name);
      setUsername(data.user.username);
      setEmail(data.user.email);
    };
    fetchUser();
  }, [userId]);

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`/api/updateProfile?id=${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email }),
    });
    const data = await response.json();
    console.log(data);

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
          <p className = {styles.msg}>{message.text}</p>
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
