import style from './Message.module.css'
import styleList from '../messageList/MessageList.module.css'
import Loader from '@/components/common/loader/Loader'
import { useSession } from 'next-auth/react'
import { RecentMessageContext } from '@/providers/RecentMessageProvider'
import MessagePortion from './MessagePortion'
import MessageInput from './MessageInput'
import deleteNotification from '@/helper/frontend/deleteNotification'
import { useEffect, useState, useContext } from 'react'

export default function Messages({ receiver, email }) {
    const [profile, setProfile] = useState(receiver);
  
    const [messages, setMessages] = useState();
    const [recentmessages, setRecentMessages] = useContext(RecentMessageContext);
    const session = useSession();
    const deleteNotificationState = async () => {
      setRecentMessages((state) => {
        const newState = { ...state };
        newState.latestMessages = state.latestMessages.filter(
          (el) => el.sender !== receiver._id
        );
        if (newState.latestMessages.length == 0) {
          newState.showNotification = false;
        }
  
        return newState;
      });
    };
  
    useEffect(() => {
      if (session.data) {
        deleteNotificationState();
        deleteNotification(session.data?.user.id, receiver._id);
      }
  
      return () => {};
    }, [setRecentMessages, receiver, session.data]);
  
    useEffect(() => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
  
      async function getMessages() {
        try {
          const response = await fetch(
            `/api/v2/messages?senderId=${session.data?.user.id}&receiverId=${receiver?._id}`,
            requestOptions
          );
          const result = await response.json();
          console.log(result)
  
          if (result) {
            setRecentMessages((state) => {
              return { ...state, messages: result.messages };
            });
          } else {
            setRecentMessages((state) => {
              return { ...state, messages: [] };
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
  
      if (session.data && receiver) {
        getMessages();
      }
      setProfile({ ...receiver });
  
      return () => {};
    }, [session.data, setRecentMessages, receiver]);
  
    const handleSendMsg = async (e) => {
      e.preventDefault();
  
      setMessages((state) => "");
  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        senderEmail: session.data.user.email,
        receiverEmail: profile.email,
        body: messages,
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      async function sendRequest() {
        try {
          var response = await fetch(
            "http://localhost:3000/api/v2/messages",
            requestOptions
          );
          var result = await response.json();
          //
  
          setRecentMessages((state) => {
            return { ...state, messages: result.messages };
          });
        } catch (error) {
          setMessages(error.message);
        }
      }
  
      await sendRequest();
    };
  
    return (
      <section className={style.messages}>
        {profile ? (
          profile ? (
            <>
              <div className={styleList.glassPortion}>
                <div className={styleList.header}>
                  {profile && <h3>{profile.username} </h3>}
                </div>
              </div>
              <div
                onClick={() => {
                  console.log("onClick");
                  setRecentMessages((state) => {
                    const newState = { ...state };
                    newState.latestMessages = state.latestMessages.filter(
                      (el) => el.sender !== receiver._id
                    );
                    if (newState.latestMessages.length == 0) {
                      newState.showNotification = false;
                    }
  
                    return newState;
                  });
  
                  deleteNotification(session.data?.user.id, receiver._id);
                }}
              >
                {recentmessages.messages && <MessagePortion profile={profile} />}
                <MessageInput profile={profile}></MessageInput>
              </div>
            </>
          ) : (
            <div>{profile.msg}</div>
          )
        ) : (
          <Loader />
        )}
      </section>
    );
  }