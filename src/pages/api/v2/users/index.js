import { getServerSession } from "next-auth";
import { parseForm } from "@/helper/backend/parseForm";
import User from "@/models/User";
import { authOptions } from "../../auth/[...nextauth]";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  // if (req.method === "GET") {
  //   const { id = "", email = "" } = req.body;

  //   try {
  //     await connectMongo();
  //     const user = await UserDB.findOne({
  //       $or: [{ id: id }, { email: email }],
  //     });

  //     if (!user) {
  //       return res.status(400).json({ msg: "User not found" });
  //     }

  //     return res.status(200).json({ user });
  //   } catch (e) {
  //     return res.status(500).json({ msg: "Server Error" });
  //   }
  // }

  if (req.method == "PATCH") {
    // req.body._id = session.user.id;
    // const { _id, bio, username, image, coverImage } = req.body;

    try {
      const session = await getServerSession(req, res, authOptions(req));
      const { fields, files } = await parseForm(req, "profiles");
      const { _id, username, bio } = fields;

      const user = await User.findById(_id);

      const image = files.image
        ? "/images/profiles/" + files.image?.newFilename
        : null;
      const coverImage = files.coverImage
        ? "/images/profiles/" + files.coverImage?.newFilename
        : null;
      if (fields._id != session.user.id || !session) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      user.bio = bio ? bio : user.bio;
      user.username = username ? username : user.username;
      user.dp = image ? image : user.dp;
      user.cp = coverImage ? coverImage : user.cp;

      await user.save();

      return res.status(200).json({ user });
    } catch (e) {
      return res.status(500).json({ msg: "Server error", e });
    }
  }

  if (req.method == "GET") {
    let { number } = req.query;
    if (!number) number = 5;

    try {
      
      const users = await User.find()
        .limit(number)
        .select({ _id: 1, username: 1, dp: 1, email: 1 });
      return res.status(200).json({ msg: "Success", users });
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  }

  return res.status(404).json({ msg: "Method not found" });
}
