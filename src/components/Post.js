import {
  DotsHorizontalIcon,
  ChatIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import styles from "../styles/post.module.css";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReTweet from "./ReTweet";
import Comment from "./Comment";
import { likeUnlikeTweet } from "../actions/postActions";
import { reTweet } from "../actions/postActions";

const Post = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [showRetweet, setShowRetweet] = useState(false);
  const postId = post?._id;
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [like, setLike] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(
    post?.likes?.includes(session?.user?.id)
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [retweetText, setRetweetText] = useState("");

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!url.includes("modal=comment")) {
        setLoading(false);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const handleLikeUnlike = () => {
    likeUnlikeTweet(postId, session, setIsLiked, setLike);
  };


  const handleRetweet = async () => {
    try {
      const data = await reTweet(postId, session?.user?.id, retweetText);
      setRetweetText("");
      setShowRetweet(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={styles.postContainer}>
      {post?.user?.dp ? (
        <Image
          width={40}
          height={40}
          className={styles.userImg}
          src={`/images/${post?.user.dp}`}
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

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.postHeader}>
            <h4
              className={styles.postFullName}
              onClick={() => router.push(`auth/profile/${post?.user._id}`)}
            >
              {post?.user?.name}
            </h4>

            {post?.user?.username ? (
              <span className={styles.postUserName}>
                @{post?.user.username}
              </span>
            ) : (
              <span className={styles.postUserName}>
                @{post?.user?.username}
              </span>
            )}
            <div className={styles.dot}></div>
            <span className={styles.postTime}>
              {post?.createdAt && (
                <>
                  {" "}
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}{" "}
                </>
              )}
            </span>
          </div>
          {/* icon */}
          <DotsHorizontalIcon className={`hoverEffect ${styles.postDotIcon}`} />
        </div>
        {/* post */}
        {post?.retweet?.isRetweet ? (
          <>
            <p className={styles.postText}>{post?.text}</p>
            <div className={styles.retweetContainer}>
              <ReTweet id={post?.retweet.tweet} />
            </div>
          </>
        ) : (
          <>
            <p className={styles.postText}>{post?.text}</p>
            {/* img */}
            <div className={styles.postImgCont}>
              {post?.images?.length > 0 &&
                post?.images?.map((image, index) => {
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
          </>
        )}

        {/* icons */}

        <div className={styles.iconsContainer}>
          {!session && (
            <ChatIcon
              className={`hoverEffect ${styles.postIcons}`}
              onClick={() => {
                router.push("/?modal=login");
              }}
            />
          )}
          {!session && (
            <TrashIcon
              className={`hoverEffect ${styles.postIcons} ${styles.diffStyle}`}
              onClick={() => {
                router.push("/?modal=login");
              }}
            />
          )}
          {session && (
            <div className={styles.comIcoNum}>
              <span className={styles.commentNumber}>
                {post?.comments?.length}
              </span>
              {loading ? (
                <div className={styles.spinner}></div>
              ) : (
                <ChatIcon
                  className={`hoverEffect ${styles.postIcons}`}
                  onClick={() => {
                    // setLoading(true);
                    // router.push(`/?modal=comment&id=${post._id}`);
                    setShowComment(!showComment);
                  }}
                />
              )}
            </div>
          )}

          {session && session.user.id === post?.user?._id && (
            <>
              <TrashIcon
                className={`hoverEffect ${styles.postIcons} ${styles.diffStyle}`}
                onClick={() => {
                  console.log(post._id);
                  router.push(`/?modal=delete&id=${post._id}`);
                }}
              />
              <PencilIcon
                className={`hoverEffect ${styles.postIcons}`}
                onClick={() => {
                  router.push("/?modal=editPost&id=" + post._id);
                }}
              />
            </>
          )}

          {!session && (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>{like}</span>
                <HeartIcon
                  className={`hoverEffect ${styles.postIcons} ${styles.diffStyle}`}
                  onClick={() => {
                    router.push("/?modal=login");
                  }}
                />
              </div>

              <ShareIcon
                className={`hoverEffect ${styles.postIcons}`}
                onClick={() => {
                  router.push("/?modal=login");
                }}
              />
            </>
          )}

          {session && (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>{like}</span>
                <HeartIcon
                  className={`${styles.postIcons} 'hoverEffect' ${
                    styles.diffStyle
                  } ${isLiked ? `${styles.likedHeartIcon}` : ""}`}
                  onClick={handleLikeUnlike}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{post.numberOfRetweets}</span>
                <ShareIcon
                  className={`hoverEffect ${styles.postIcons}`}
                  onClick={() => {
                    // router.push("/?modal=retweet");
                    setShowRetweet(!showRetweet);
                  }}
                />
              </div>
            </>
          )}
        </div>
        {showRetweet && (
          <div className={styles.retweetTextarea}>
            <textarea
              className={styles.retweetTextarea}
              rows="2"
              placeholder="Add quote..."
              onChange={(e) => {
                setRetweetText(e.target.value);
              }}
            />

            <button className={styles.retweetBtns} onClick={handleRetweet}>
              Retweet
            </button>
          </div>
        )}

        {showComment && (
          <div className="">
            <Comment id={post._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
