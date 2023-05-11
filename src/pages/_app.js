import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "intersection-observer/intersection-observer.js";
import { useEffect, useState } from "react";
import RecentMessageProvider from "../providers/RecentMessageProvider";
import PostsContext from "../providers/postContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      const firebaseApp = require("firebase-admin").initializeApp();
      const messaging = require("firebase-admin/messaging").getMessaging(
        firebaseApp
      );
    }
  }, []);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <PostsContext.Provider value={[posts, setPosts]}>
        <RecentMessageProvider>
          <Component {...pageProps} />
        </RecentMessageProvider>
      </PostsContext.Provider>
    </SessionProvider>
  );
}
