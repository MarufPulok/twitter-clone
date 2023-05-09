import { getProviders, signIn } from "next-auth/react"
import styles from '../../styles/signIn.module.css'

const signin = ({ providers }) => {
  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.signupContainer}>
      <h2>Create your account</h2>
      <form action="" className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="name">Name</label>
          <input className={styles.formInput} type="text" name="name" id="name" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="username">Username</label>
          <input className={styles.formInput} type="text" name="username" id="username" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="email">Email</label>
          <input className={styles.formInput} type="email" name="email" id="email" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="password">Password</label>
          <input className={styles.formInput} type="password" name="password" id="password" />
        </div>
        <button className={styles.submitButton} type='submit'>Sign up</button>
      </form>
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default signin;
