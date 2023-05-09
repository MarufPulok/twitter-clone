import styles from "../styles/feed.module.css";
import Input from "./Input";
import Post from "./Post";
import { useState, useEffect, useRef, useReducer } from "react";
import { useSession } from "next-auth/react";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/getAllTweets?page=${page}`);
        const data = await res.json();
        setPosts((prevPosts) => [...prevPosts, ...data.tweets]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
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
      {posts?.map((post, index) => {
        return <Post key={`${post._id}-${index}`} post={post} />;
      })}

      <div ref={loaderRef} className={styles.loaderCont}>
        <span className={styles.loader}></span>
      </div>
    </div>
  );
};

export default Feed;

// import styles from "@/styles/feed.module.css";
// import Input from "./Input";
// import Post from "./Post";
// import { useEffect, useRef, useReducer } from "react";
// import { useSession } from "next-auth/react";
// import feedReducer from "../reducers/feedReducer";

// const Feed = () => {
//   const { data: session } = useSession();
//   const loaderRef = useRef(null);

//   const initialState = {
//     posts: [],
//     page: 1,
//     loading: false,
//   };

//   const [state, dispatch] = useReducer(feedReducer, initialState);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         dispatch({ type: "SET_LOADING", payload: true });
//         const res = await fetch(`/api/users/getAllTweets?page=${state.page}`);
//         const data = await res.json();
//         dispatch({ type: "SET_POSTS", payload: data.tweets});
//       } catch (err) {
//         console.log(err);
//       } finally {
//         dispatch({ type: "SET_LOADING", payload: false });
//       }
//     };
//     fetchPosts();
//   }, [state.page]);

//   const observer = useRef(
//     typeof IntersectionObserver !== "undefined" &&
//       new IntersectionObserver(
//         (entries) => {
//           const firstEntry = entries[0];
//           if (firstEntry.isIntersecting && !state.loading) {
//             dispatch({ type: "SET_PAGE", payload: state.page + 1 });

//           }
//         },
//         { rootMargin: "20px" }
//       )
//   );

//   useEffect(() => {
//     const currentLoaderRef = loaderRef.current;
//     if (currentLoaderRef) {
//       observer.current.observe(currentLoaderRef);
//     }
//     return () => {
//       if (currentLoaderRef) {
//         observer.current.unobserve(currentLoaderRef);
//       }
//     };
//   }, [loaderRef]);

//   const updatePosts = (newPost) => {
//     dispatch({ type: "SET_POSTS", payload: [newPost, ...state.posts] });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.homeCont}>
//         <span className={styles.homeText}>Home</span>
//       </div>
//       <Input updatePosts={updatePosts} />
//       {state.posts.length > 0 ? (
//         state.posts.map((post, index) => {
//           return <Post key={`${post._id}-${index}`} post={post} />;
//         })
//       ) : (
//         <div>No posts found.</div>
//       )}

//       <div ref={loaderRef} className={styles.loaderCont}>
//         <span className={styles.loader}></span>
//       </div>
//     </div>
//   );
// };

// export default Feed;
