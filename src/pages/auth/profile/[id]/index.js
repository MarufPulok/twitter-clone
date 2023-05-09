// import { getSession, useSession } from "next-auth/react";
import styles from "@/styles/profile.module.css";
import Sidebar from "@/components/Sidebar";
import Post from "@/components/Post";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const id = router.query.id;
  console.log(id);
  const [follow, setFollow] = useState();
  const [dp, setDp] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/getUserPost?id=${id}`);
      const data = await res.json();
      setPosts(data.posts);
    };
    const fetchUser = async () => {
      const res = await fetch(`/api/getUserInfo?id=${router.query.id}`);
      const data = await res.json();
      console.log(data);
      setUsername(data?.user?.username || "");
      setName(data?.user?.name || "");
      setFollowing(data?.user?.following?.length || 0);
      setFollowers(data?.user?.followers?.length || 0);
      setFollow(data?.user?.followers?.includes(session?.user.id) || false);
      setDp(data?.user?.dp);
    };
    fetchPosts();
    fetchUser();
  }, [id]);

  const handleFollow = async (userId, isFollowed, index) => {
    const res = await fetch(`/api/followUser?id=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId: session?.user.id,
      }),
    });

    const data = await res.json();
    console.log(data);
    setFollow(!follow);
  };

  return (
    <>
      {posts?.length === 0 ? (
        <>
          <div className={styles.profile}>
            <div className={styles.side}>
              <Sidebar />
            </div>
            <div className={styles.profileRightTop}>
              <div className={styles.profileCover}>
                <Image
                  className={styles.profileCoverImg}
                  src="https://images.unsplash.com/photo-1675870730410-7671bf53de53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
                  alt="cp"
                  width={400}
                  height={400}
                />
                {dp ? (
                  <Image
                    className={styles.profileUserImg}
                    src={`/images/${dp}`}
                    alt="dp"
                    width={400}
                    height={400}
                  />
                ) : (
                  <Image
                    className={styles.profileUserImg}
                    src="/default.png"
                    alt="dp"
                    width={400}
                    height={400}
                  />
                )}
              </div>
              <div className={styles.profileInfo}>
                <h2>{name}</h2>
                <span>@{username}</span>
                <span
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => router.push("/?modal=followers")}
                >
                  Followers: {followers}
                </span>
                <span
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => router.push("/?modal=following")}
                >
                  Following: {following}
                </span>
                <button
                  className={styles.profileEditBtn}
                  onClick={() => handleFollow(id, follow)}
                >
                  {follow ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.profile}>
          <div className={styles.side}>
            <Sidebar />
          </div>
          <div className={styles.profileRightTop}>
            <div className={styles.profileCover}>
              <Image
                className={styles.profileCoverImg}
                src="https://images.unsplash.com/photo-1675870730410-7671bf53de53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
                alt="cp"
                width={400}
                height={400}
              />

              {dp ? (
                <Image
                  className={styles.profileUserImg}
                  src={`/images/${dp}`}
                  alt="dp"
                  width={400}
                  height={400}
                />
              ) : (
                <Image
                  className={styles.profileUserImg}
                  src="/default.png"
                  alt="dp"
                  width={400}
                  height={400}
                />
              )}
            </div>
            <div className={styles.profileInfo}>
              <h2>{name}</h2>
              <h3>@{username}</h3>
              <span
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => router.push("/?modal=followers")}
              >
                Followers: {followers}
              </span>
              <span
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => router.push("/?modal=following")}
              >
                Following: {following}
              </span>
              <button
                className={styles.profileEditBtn}
                onClick={() => handleFollow(id, follow)}
              >
                {follow ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        </div>
      )}

      {posts?.length === 0 ? (
        <h2 className={styles.prompt}>NO TWEETS YET</h2>
      ) : (
        <div className={styles.postContainer}>
          {posts?.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        </div>
      )}
    </>
  );
};

export default User;
