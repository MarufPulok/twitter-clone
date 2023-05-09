import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    if (result?.error) {
      console.error(result.error);
    }
  };

  const handleGithubSignin = async () => {
    const result = await signIn("github", { callbackUrl: "/" });

    if (result?.error) {
      console.error(result.error);
    }
  };

  return (
    <div className="">
      <Image
        width="50"
        height="50"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1245px-Twitter-logo.svg.png"
        alt=""
        style={{ marginLeft: "90px" }}
      ></Image>
      <h2>Sign in to Twitter</h2>
      <div className={styles.formContainer}>
        <form onSubmit={handleSignIn}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="email">
              Email
            </label>
            <input
              className={styles.formInput}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="password">
              Password
            </label>
            <input
              className={styles.formInput}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button type="submit" className={styles.loginBtn}>
            Sign in with Credentials
          </button>
        </form>
      </div>

      <button onClick={handleGithubSignin} className={styles.loginBtn}>
        <AiFillGithub />
        Sign in with Github
      </button>
      <br />
      <span>
        Don't have an account?<Link href="/?modal=signup">Sign up</Link>
      </span>
    </div>
  );
};

export default Login;
