import classes from "../styles/sidebarItem.module.css";
import { useRouter } from "next/router";

const SideBarMenuItem = ({ text, Icon }) => {
  const router = useRouter();
  return (
    <div
      className={`${classes.sidebarItems}`}
      onClick={() => {
        if (text === "Home") {
          router.push("/");
        }
        if (text === "Profile") {
          router.push("/auth/profile");
        }

        if (text === "Messages") {
          router.push("/message");
        }
      }}
    >
      <Icon className={classes.iconStyle} onClick={() => router.push("/")} />
      {text === "Home" && <span className={classes.bold}>{text}</span>}
      {text !== "Home" && <span>{text}</span>}
    </div>
  );
};

export default SideBarMenuItem;
