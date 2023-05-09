import styles from "../styles/footer.module.css";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerText}>
        <h1>Don&apos;t miss what&apos;s happening</h1>
        <span>People on Twitter are the first to know.</span>
      </div>
        <div >
            <button className={styles.footerBtnL} onClick={() => {
            router.replace("/?modal=login");
            }}>Login</button>
            <button className={styles.footerBtnS} onClick={() => {
            router.replace("/?modal=signup");
            }}>Sign up</button>
        </div>
    </div>
  );
};

export default Footer;
