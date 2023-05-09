import { getSession, useSession } from "next-auth/react";
import styles from "../../../styles/profile.module.css";
import Sidebar from "../../../components/Sidebar";
import Post from "../../../components/Post";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CameraIcon, CheckCircleIcon } from "@heroicons/react/outline";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const { data: session } = useSession();
  const id = session?.user?.id;

  const [userDp, setUserDp] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/getUserPost?id=${id}`);
      const data = await res.json();
      setPosts(data.posts);
      console.log(posts)
    };
    const fetchUser = async () => {
      const res = await fetch(`/api/getUserInfo?id=${id}`);
      const data = await res.json();
      setUser(data.user);
      setUsername(data?.user?.username);
      setFollowing(data?.user?.following.length);
      setFollowers(data?.user?.followers.length);
      setUserDp(data?.user?.dp);
      setName(data?.user?.name);
    };
    fetchPosts();
    fetchUser();
  }, [id]);

  const handleDpUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", session.user.email);
    formData.append("dp", selectedImage);
    const res = await fetch("/api/uploadDp", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    setUserDp(data.dp);
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
        <div className={styles.postContainer}>
          {posts?.map((post) => {
            return <Post key={post._id} post={post} />;
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
