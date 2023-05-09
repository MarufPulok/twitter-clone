import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/rightbar.module.css";
import { AiFillGithub } from "react-icons/ai";

const RightBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGithubSignin = async () => {
    const result = await signIn("github");
    // router.push("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

    if (result?.error) {
      console.error(result.error);
    } else if (session) {
      router.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <h1>New to Twitter?</h1>
      <p>Sign up now to get your own personalized timeline!</p>
      <button onClick={handleGithubSignin} className={styles.SignupBtn}>
        <AiFillGithub />
        Sign in with Github
      </button>
    </div>
  );
};

export default RightBar;
