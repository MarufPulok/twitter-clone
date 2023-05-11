import styles from "../styles/widgets.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getRandomUsers } from "../actions/fetchActions";
import { handleFollow } from "../actions/widgetAction";

const Widgets = ({ newsResults }) => {
  const [animationParent] = useAutoAnimate();
  const { data: session } = useSession();
  const [randomUsers, setRandomUsers] = useState([]);
  const [numUsersToShow, setNumUsersToShow] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getRandomUsers(session.user.id);
      setRandomUsers(users);
    };
    fetchUsers();
  }, [session.user.id]);

  const handleFollowWrapper = async (userId, isFollowed, index) => {
    await handleFollow(
      userId,
      isFollowed,
      index,
      session,
      randomUsers,
      setRandomUsers
    );
  };

  const handleShowMore = () => {
    setNumUsersToShow(numUsersToShow + 5);
  };

  const handleShowLess = () => {
    if (numUsersToShow > 5) {
      setNumUsersToShow(numUsersToShow - 5);
    }
  };

  const usersToShow = randomUsers.slice(0, numUsersToShow);

  return (
    <div style={{ marginTop: "10px" }}>
      <div className={styles.followS} ref={animationParent}>
        <h4>Who to follow</h4>
        {usersToShow?.map((user, index) =>
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
              <button
                className={styles.followButton}
                onClick={() =>
                  handleFollowWrapper(user._id, user.isFollowed, index)
                }
              >
                {user.isFollowed ? "Unfollow" : "Follow"}
              </button>
            </div>
          )
        )}
        <div className={styles.showBtnContainer}>
          {numUsersToShow < randomUsers.length && (
            <button className={styles.showMoreButton} onClick={handleShowMore}>
              Show more
            </button>
          )}
          {numUsersToShow > 5 && (
            <button className={styles.showMoreButton} onClick={handleShowLess}>
              Show less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Widgets;
