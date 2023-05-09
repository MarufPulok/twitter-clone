import { useEffect, useState } from "react";
import styles from "../styles/post.module.css";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { fetchTweetAction } from "../actions/fetchActions";

const ReTweet = ({ id }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [dp, setDp] = useState("");
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    fetchTweetAction(
      id,
      setName,
      setUsername,
      setDp,
      setText,
      setImages,
      setCreatedAt
    );
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {dp ? (
          <Image
            width={40}
            height={40}
            className={styles.userImg}
            src={`/images/${dp}`}
            alt="user"
          />
        ) : (
          <Image
            width={40}
            height={40}
            className={styles.userImg}
            src="/default.png"
            alt="user"
          />
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.postHeader}>
            <h4 className={styles.postFullName}>{name}</h4>

            {username ? (
              <span className={styles.postUserName}>@{username}</span>
            ) : (
              <span className={styles.postUserName}>@{username}</span>
            )}
            <div className={styles.dot}></div>
            <span className={styles.postTime}>
              {createdAt && (
                <>
                  {" "}
                  {formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                  })}{" "}
                </>
              )}
            </span>
          </div>
        </div>
      </div>
      <p className={styles.postText}>{text}</p>
      {/* img */}
      <div className={styles.postImgCont}>
        {images.length > 0 &&
          images.map((image, index) => {
            return (
              <Image
                key={index}
                height={400}
                width={400}
                className={styles.postImg}
                src={`/images/${image}`}
                alt=""
              />
            );
          })}
      </div>
    </div>
  );
};

export default ReTweet;
