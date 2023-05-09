import styles from "../styles/modal.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Modal = ({ children }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      if (router.asPath === "/") {
        router.push("/");
      } else {
        router.push(router.asPath.split("?")[0]);
      }
    }, 300);
  };

  return (
    <div className={`${styles.modalMain}${show ? ` ${styles.show}` : ""}`}>
      <div className={styles.modalContainer}>
        <div className={styles.close} onClick={handleClose}>
          &times;
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
