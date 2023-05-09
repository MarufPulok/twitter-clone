import Image from "next/image";
import SideBarMenuItem from "./SidebarMenuItem";
import DropdownMenu from "./DropDownMenu";
import { HomeIcon } from "@heroicons/react/solid";
import {
  DotsCircleHorizontalIcon,
  BellIcon,
  BookmarkIcon,
  HashtagIcon,
  InboxIcon,
  ClipboardIcon,
  UserIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import styles from "../styles/sidebarItem.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const { data: session } = useSession();
  // console.log(session)
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [dp, setDp] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const fetchUser = async () => {
    const res = await fetch(`/api/getUserInfo?id=${session?.user?.id}`);
    const data = await res.json();
    setDp(data?.user?.dp);
    setName(data?.user?.name);
    setUsername(data?.user?.username);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="mainSidebarGlobal">
      <div
        className={`hoverEffect ${styles.brand}`}
        onClick={() => router.push(`/`)}
      >
        <Image
          width="50"
          height="50"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1245px-Twitter-logo.svg.png"
          alt=""
        ></Image>
      </div>
      <div className={styles.container}>
        <SideBarMenuItem
          text="Home"
          Icon={HomeIcon}
          onClick={() => router.push(`/`)}
        />
        <SideBarMenuItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SideBarMenuItem text="Notifications" Icon={BellIcon} />
            <SideBarMenuItem text="Messages" Icon={InboxIcon} />
            <SideBarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
            <SideBarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SideBarMenuItem text="Profile" Icon={UserIcon} />
            <SideBarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {session && <button className="tweetButton">Tweet</button>}

      {session && (
        <>
          <div className={`${styles.profile} ${styles.profileHover} `}>
            <div
              className={styles.profileHover}
              onClick={() => router.push(`/auth/profile/`)}
            >
              {dp ? (
                <Image
                  src={`/images/${dp}`}
                  className={styles.image}
                  height="50"
                  width="50"
                  alt="user-image"
                ></Image>
              ) : (
                <Image
                  src="/default.png"
                  className={styles.image}
                  height="50"
                  width="50"
                  alt="user-image"
                ></Image>
              )}
              <div>
                <h4 className={styles.fullName}>{session?.user.name}</h4>
                <p className={styles.userName}>
                  @
                  {session?.user.username}
                </p>
              </div>
            </div>
            <DotsHorizontalIcon
              className={styles.icon}
              onClick={toggleDropdown}
            />
            {showDropdown && <DropdownMenu />}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
