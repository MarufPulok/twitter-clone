import { getSession, useSession } from "next-auth/react";
import styles from "../../../styles/profile.module.css";
import Sidebar from "../../../components/Sidebar";
import Post from "../../../components/Post";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CameraIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { fetchUserPosts, fetchUserInfo } from "../../../actions/profileActions";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import { uploadDp } from "../../../actions/profileActions";

const Profile = () => {
  const [animationParent] = useAutoAnimate();
  const [user, setUser] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const { data: session } = useSession();
  const id = session?.user?.id;

  const [userDp, setUserDp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchUserPosts(id);
      const user = await fetchUserInfo(id);
      setPosts(posts);
      setUser(user);
      setUsername(user.username);
      setFollowing(user.following.length);
      setFollowers(user.followers.length);
      setUserDp(user.dp);
      setName(user.name);
    };
    fetchData();
  }, [id]);

  const handleDpUpload = async (e) => {
    e.preventDefault();
    const dpUrl = await uploadDp(session.user.email, selectedImage);
    setUserDp(dpUrl);
    setSelectedImage(null);
  };

  const handleRemoveDp = () => {
    setSelectedImage(null);
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
                  src="/default.png"
                  alt="cp"
                  width={400}
                  height={400}
                />
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
                  onClick={() => router.push("/?modal=editProfile")}
                >
                  edit profile
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
              <div className="">
                <Image
                  className={styles.profileCoverImg}
                  src="/default.png"
                  alt="cp"
                  width={400}
                  height={400}
                />
                <CameraIcon
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    cursor: "pointer",
                  }}
                />
                <CheckCircleIcon
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {selectedImage ? (
                  <Image
                    className={styles.profileUserImg}
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected image"
                    width={400}
                    height={400}
                  />
                ) : userDp ? (
                  <Image
                    className={styles.profileUserImg}
                    src={`/images/${userDp}`}
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

                {selectedImage && (
                  <button onClick={handleRemoveDp} className={styles.removeDp}>
                    Deselect
                  </button>
                )}
                <label htmlFor="image-upload">
                  <CameraIcon
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      cursor: "pointer",
                      marginLeft: "11rem",
                    }}
                  />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  onChange={({ target }) => {
                    const file = target.files[0];
                    setSelectedImage(file);
                  }}
                  style={{ display: "none" }}
                />

                <CheckCircleIcon
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    cursor: "pointer",
                  }}
                  onClick={handleDpUpload}
                />
              </div>
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
                onClick={() => router.push("/?modal=editProfile")}
              >
                edit profile
              </button>
            </div>
          </div>
        </div>
      )}

      {posts?.length === 0 ? (
        <h2 className={styles.prompt}>NO TWEETS YET</h2>
      ) : (
        <div className={styles.postContainer} ref={animationParent}>
          {posts?.map((post) => {
            return <Post key={post._id} post={post}/>;
          })}
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/?modal=login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Profile;
