import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import Image from "next/image";
import styles from "../styles/widgets.module.css";

const Following = () => {
  const { data: session } = useSession();
  const [following, setFollowing] = useState([]);
  const userId = session?.user.id;

  useEffect(() => {
    const fetchFollowing = async () => {
      const res = await fetch(`/api/getFollowing?id=${userId}`);
      const data = await res.json();
      setFollowing(data.following);
    };
    fetchFollowing();
  }, []);
  return (
    <div className={styles.followS}>
      <h3>Following</h3>
      {following?.map((user, index) =>
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

export default Following;
