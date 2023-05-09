import { useState } from "react";
import styles from "../styles/signUp.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const res = await fetch("/api/users/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        confirmPassword,
      }),
    });
    setLoading(false);
    const data = await res.json();

    if (res.ok) {
      setError("");
      alert("Account created successfully!");
    } else {
      setError(data);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <Image
        width="50"
        height="50"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCA9a1YBl7FI-LDF5YlaG03Q5CE01zyKGimt2k48Qf&s"
        alt=""
      ></Image>
      <h2>Join Twitter today</h2>
      {error && <p className={styles.error}>{error.message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="name">
            Name
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="username">
            Username
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="email">
            Email
          </label>
          <input
            className={styles.formInput}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="password">
            Confirm Password
          </label>
          <input
            className={styles.formInput}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
{        <button className={styles.submitButton} type="submit">
          {loading ? "Loading..." : "Create account"}
        </button>}
      </form>
      <span className={styles.terms}>
        By signing up, you agree to the Terms of Service and Privacy Policy,
        including Cookie Use.
      </span>
      <br />
      <br />
      <span className={styles.terms}>
        Have an account already? <Link href="/?modal=login">Log in</Link>
      </span>
    </div>
  );
};

export default Signup;
