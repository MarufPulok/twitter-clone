import styles from "../styles/widgets.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { fetchFollowers } from "../actions/fetchActions";
import { useRouter } from "next/router";

const Followers = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [followers, setFollowers] = useState([]);
  const userId = session?.user.id;

  useEffect(() => {
    const getFollowers = async () => {
      const followersData = await fetchFollowers(userId);
      setFollowers(followersData);
    };
    getFollowers();
  }, [userId]);

  return (
    <div className={styles.followS}>
      <h3>Followers</h3>
      {followers?.map((user, index) =>
        session.user.id === user._id ? null : (
          <div className={styles.follow} key={user._id}>
            {user.dp ? (
              <Image
                width={40}
                height={40}
                src={`/images/${user.dp}`}
                alt=""
                className={styles.avatar}
              />
            ) : (
              <Image
                width={40}
                height={40}
                src="/default.png"
                alt=""
                className={styles.avatar}
              />
            )}

            <div
              className={styles.followInfo}
              onClick={() =>
                router.push(
                  `/auth/profile/${user._id}?isFollowed=${user.isFollowed}`
                )
              }
            >
              <h4>{user.name}</h4>
              <p>{user.username}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Followers;
