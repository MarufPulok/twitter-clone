import Avatar from "@/components/common/avatar/avatar";
import MessageComponent from "./messageComponent";
import style from "./Message.module.css";
import { RecentMessageContext } from "@/providers/RecentMessageProvider";
import {format} from 'date-fns'
import { useContext, useEffect, useRef } from "react";

export default function MessagePortion({ profile }) {
    const showTimeAfter = 10;
    const [recentmessages] = useContext(RecentMessageContext);
    const lastmsg = useRef(null);
    useEffect(() => {
      lastmsg.current?.scrollIntoView({ behavior: "smooth" });
      return () => {};
    }, [recentmessages]);
  
    return (
      <div className={style.messagePortion}>
        {/* {console.count("rerender")} */}
        <section className={style.description}>
          <Avatar image={profile.dp}></Avatar>
          <div className={style.name}>{profile.username}</div>
          <p className={style.email}>@{profile.email}</p>
          <p>{profile.bio}</p>
          {profile.createdAt && <p>Joined {profile.createdAt.slice(0, 10)}</p>}
        </section>
        <div className={style.messagesWraper}>
          {recentmessages.messages.map((msg, index) => {
            let showAvatar;
            if (
              recentmessages.messages.length < 2 ||
              index == recentmessages.messages.length - 1
            ) {
              showAvatar = true;
            } else if (index <= recentmessages.messages.length - 2) {
              showAvatar =
                recentmessages.messages[index + 1].sender === msg.sender
                  ? false
                  : true;
            }
            return (
              <div key={msg._id}>
                {index > 0 &&
                  new Date(recentmessages.messages[index].createdAt) -
                    new Date(recentmessages.messages[index - 1].createdAt) >
                    showTimeAfter * 60 * 1000 && (
                    <div className={`${style.msgTimeOther} `}>
                      {/* {new Date(msg.createdAt)} */}
                      {format(
                        new Date(msg.createdAt),
                        "dd/MM/yy hh:mm a"
                      ).toString()}
                    </div>
                  )}
                <MessageComponent
                  showAvatar={showAvatar}
                  message={msg}
                  sender={profile}
                ></MessageComponent>
              </div>
            );
          })}
        </div>
        <div ref={lastmsg}></div>
      </div>
    );
  }