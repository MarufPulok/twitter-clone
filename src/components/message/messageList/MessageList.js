import style from './MessageList.module.css';
import styles from './modal.module.css'
import { useSession } from 'next-auth/react';
import Avatar from '@/components/common/avatar/avatar';
import { RecentMessageContext } from '@/providers/RecentMessageProvider';
import {useRouter} from 'next/router';
import { useEffect, useState, useContext } from 'react';

export default function MessageList({ setselectedID, messages }) {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState(messages);
    const session = useSession();
    const [recentMessage, setRecentMessage] = useContext(RecentMessageContext);
    // const [recentMessage, setRecentMessage] = useContext(RecentMessageContext) ?? [];

    const router = useRouter();
    async function getUsers(number = 10000) {
      try {
        const res = await fetch("/api/v2/users?number=" + number, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
  
        res.ok && setUsers(result.users);
      } catch (error) {}
    }
    useEffect(() => {
      if (!messages) {
        getUsers();
      }
  
      return () => {};
    }, [messages]);
    const onSubmit = (e, str) => {
      e.preventDefault();
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
  
      async function fetchUser() {
        try {
          const response = await fetch(
            "/api/v2/messages/searchUser?search=" + (str == "" ? str : search),
            requestOptions
          );
          const result = await response.json();
  
          if (response.ok) {
            setUsers(result);
          }
        } catch (error) {}
      }
      fetchUser();
    };
    const onChange = (event) => {
      setSearch(event.target.value);
  
      if (event.target.value == "") {
        onSubmit(event, "");
      }
    };
  
    return (
      <>
        <section className={style.list}>
          <div className={style.glassPortion}>
            <div className={`${style.header} `}>
              <h3 className={style.title}>Messages</h3>
              <div className={style.logos}>
                <div>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path>
                    </g>
                  </svg>
                </div>
                <div>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V12h-2v-1.537l-8 3.635-8-3.635V18.5c0 .276.224.5.5.5H13v2H4.498c-1.381 0-2.5-1.119-2.5-2.5v-13zm2 2.766l8 3.635 8-3.635V5.5c0-.276-.224-.5-.5-.5h-15c-.276 0-.5.224-.5.5v2.766zM19 18v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div
              className={styles["input-group"]}
              style={{
                boxSizing: "border-box",
                width: "90%",
                marginInline: "auto",
                marginTop: ".5rem",
              }}
            >
              <input
                value={search}
                onChange={onChange}
                type="text"
                name="Search"
                placeholder="Hola"
                className={`${styles["input"]} ${style["input"]}`}
              />
              <label className={styles["user-label"]}>Search</label>
            </div>
          </form>
          <div className={style.convoList}>
            {users &&
              users.map((user) => {
                if (user.sender) {
                  user._id = user.sender;
                }
                return (
                  <div
                    key={user._id}
                    className={`${style.convo} ${
                      recentMessage?.latestMessages?.some(
                        (el) => el.sender == user._id
                      ) &&
                      recentMessage.showNotification &&
                      style["noti-bg"]
                    } ${
                      router.query.receiverId == user._id ? style.current : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      // setRecentMessage((state) => {
                      //   return {
                      //     ...state,
                      //     showNotification: false,
                      //   };
                      // });
                      setselectedID(user);
                      router.push(
                        `/message/?senderId=${session.data?.user.id}&receiverId=${user._id}`,
                        undefined,
                        { shallow: true }
                      );
                    }}
                  >
                    <div className={style.convoAvatar}>
                      <Avatar image={user.dp} width="50px"></Avatar>
                    </div>
                    <div className={style.convoDetails}>
                      <div className={style.convoHeader}>
                        <span className={style.convoName}>{user.username}</span>
                        <span className={style.convoUsername}>{user.email}</span>
                      </div>
                      <div className={style.convoContent}>
                        {/* <span>Hey, how are you?</span> */}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </>
    );
  }