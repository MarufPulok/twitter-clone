// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method == "PATCH") {
    const token = req.body.token;
    const _id = req.body._id;
    try {
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      user.token = token;
      await user.save();
      return res.status(200).json({ msg: "Token updated", user });
    } catch (error) {
      return res.status(500).json({ msg: "Server Error" });
    }
  }
}
