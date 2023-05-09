import connect from "@/db/connect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { id } = req.query;

    await connect();
    try {
      const user = await User.findById(id)
        .select({
          notifications: 1,
        })
        .sort({ "notifications.createdAt": -1 });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res
        .status(200)
        .json({ msg: "Success", notifications: user.notifications });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error" });
    }
  }
  if (req.method == "DELETE") {
    const { id, sender } = req.query;
    console.log(id, sender);
    try {
      if (!id) {
        return res.status(404).json({ msg: "User not found" });
      }

      // const user = await UserDBV2.findById(id);
      const [session, user] = await Promise.all([
        getServerSession(req, res, authOptions(req)),
        User.findById(id),
      ]);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      // if (session?.user?.id != id) {
      //   return res.status(401).json({ msg: "Not authorized" });
      // }

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      console.log(user.notifications.length);
      if (!sender) {
        user.notifications = [];
      } else {
        user.notifications.pull({ sender: sender });
      }

      const newUser = await user.save();

      console.log(newUser.notifications.length);

      return res.status(200).json({
        msg: "Notifications deleted successfully",
        // notifications: newUser.notifications,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  return res.status(404).json({ msg: "Method not found" });
}
