import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import "intersection-observer/intersection-observer.js";
import { useEffect } from 'react';
import RecentMessageProvider from '../providers/RecentMessageProvider';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(()=> {
    if (typeof window === "undefined") {
      const firebaseApp = require('firebase-admin').initializeApp()
      const messaging = require('firebase-admin/messaging').getMessaging(firebaseApp)
    }
  }, [])
  
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <RecentMessageProvider>
        <Component {...pageProps} />
      </RecentMessageProvider>
    </SessionProvider>
  )
}
