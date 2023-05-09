import { SearchIcon } from "@heroicons/react/outline";
import styles from "../styles/widgets.module.css";
import News from "./News";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Widgets = ({ newsResults }) => {
  const { data: session } = useSession();
  const [randomUsers, setRandomUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRandomUsers = async () => {
      const res = await fetch(`/api/getAllUsers?id=${session.user.id}`);
      const data = await res.json();
      setRandomUsers(data.users);
    };
    fetchRandomUsers();
  }, []);

  const handleFollow = async (userId, isFollowed, index) => {
    const res = await fetch(`/api/followUser?id=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId: session.user.id,
      }),
    });

    const data = await res.json();
    console.log(data);

    const updatedRandomUsers = [...randomUsers];
    updatedRandomUsers[index].isFollowed = !isFollowed;
    setRandomUsers(updatedRandomUsers);
  };

  return (
    <div>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search Twitter"
          className={styles.input}
        />
        <SearchIcon className={styles.searchIcon} />
      </div>

      {/* <div className={styles.newsContainer}>
        <h4>Trending Topics</h4>
        {newsResults.slice(0, 3).map((article) => {
          return <News article={article} key={article.url} />;
        })}
      </div> */}

      <div className={styles.followS}>
        <h4>Who to follow</h4>
        {randomUsers?.map((user, index) =>
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
                onClick={() => router.push(`/auth/profile/${user._id}?isFollowed=${user.isFollowed}`)}
              >
                <h4>{user.name}</h4>
                <p>{user.username}</p>
              </div>
              <button
                className={styles.followButton}
                onClick={() => handleFollow(user._id, user.isFollowed, index)}
              >
                {user.isFollowed ? "Unfollow" : "Follow"}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Widgets;
