import styles from "../styles/feed.module.css";
import Input from "./Input";
import Post from "./Post";
import { useState, useEffect, useRef, useReducer } from "react";
import { useSession } from "next-auth/react";
import { fetchPostsAction } from "../actions/fetchActions";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useContext } from "react";
import PostsContext from "../providers/postContext";

const Feed = () => {
  const [posts, setPosts] = useContext(PostsContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const loaderRef = useRef(null);
  const [animationParent] = useAutoAnimate();

  useEffect(() => {
    fetchPostsAction(page, setPosts, setLoading);
  }, [page]);

  const observer = useRef(
    typeof IntersectionObserver !== "undefined" &&
      new IntersectionObserver(
        (entries) => {
          const firstEntry = entries[0];
          if (firstEntry.isIntersecting && !loading) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { rootMargin: "20px" }
      )
  );

  useEffect(() => {
    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.current.observe(currentLoaderRef);
    }
    return () => {
      if (currentLoaderRef) {
        observer.current.unobserve(currentLoaderRef);
      }
    };
  }, [loaderRef]);

  const updatePosts = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.homeCont}>
        <span className={styles.homeText}>Home</span>
      </div>
      <Input updatePosts={updatePosts} />
      <div ref={animationParent}>
        {posts?.map((post, index) => {
          return <Post key={`${post.id}-${index}`} post={post} />;
        })}
      </div>

      <div ref={loaderRef} className={styles.loaderCont}>
        <span className={styles.loader}></span>
      </div>
    </div>
  );
};

export default Feed;
