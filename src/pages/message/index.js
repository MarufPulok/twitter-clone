import Sidebar from "@/components/Sidebar";
import MessageList from "@/components/message/messageList/MessageList";
import Messages from "@/components/message/messages/Messages";

// import { messaging } from "@/helper/Firebase/FirebaseInit";
import { getToken } from "firebase/messaging";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import connect from "@/db/connect";
import User from "@/models/User";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function getServerSideProps(context) {

  const { senderId, receiverId } = context.query;

  let session;
  if (!senderId) {
    session = await getServerSession(
      context.req,
      context.res,
      authOptions(context.req)
    );
  }
  try {
    await connect();
    //
    const [user, messages] = await Promise.all([
      User.findById(receiverId).select({
        _id: 1,
        username: 1,
        image: 1,
        email: 1,
      }),
      User.findById(senderId ? senderId : session.user.id).select({
        messages: 1,
      }),
    ]);

    return {
      props: {
        receiver: user ? JSON.parse(JSON.stringify(user)) : null,
        messages: messages
          ? JSON.parse(JSON.stringify(messages.messages))
          : null,
      },
    };
  } catch (e) {}
  return {
    props: {
      receiver: null,
      messages: null,
    },
  };
}

export default function Message({ receiver, messages }) {
  const session = useSession();
  const [selectedID, setselectedID] = useState(receiver);

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      const messaging = getMessaging();
      if (permission === "granted") {
        // Generate Token
        const token = await getToken(messaging, {
          vapidKey: process.env.FCM_VAPID_KEY,
        });

        try {
          const res = await fetch("/api/v2/users/token", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: session.data.user._id,
              token,
            }),
          });

          const result = await res.json();
        } catch (error) {}
        // Send this token  to server ( db)
        //
        // send to the UserDBV2
      } else if (permission === "denied") {
        alert("You denied for the notification");
      }
    }

    if (session.data?.user._id) {
      requestPermission();
    }
  }, [session.data]);
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Message page of twitter clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav2.ico" />
      </Head>
      <main className="body">
        <Sidebar></Sidebar>
        <MessageList
          messages={messages}
          setselectedID={setselectedID}
        ></MessageList>
        {selectedID && <Messages receiver={selectedID}></Messages>}
      </main>
      <style jsx>{`
        .body {
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: flex;
          overflow: hidden;
        }
        .left {
          margin-right: 1rem;
        }
      `}</style>
    </>
  );
}
