import { Fragment } from "react";
import styles from "../styles/profile.module.css";
import { signOut } from "next-auth/react";

const DropdownMenu = () => {
  return (
    <div className={`${styles.dropdown}`}>
        <button className={`${styles.logoutBtn}`} onClick={signOut}>Sign out</button>
    </div>
  );
};

export default DropdownMenu;
