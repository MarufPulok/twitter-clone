import User from "../../../models/User";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, followId } = req.body;

  try {
    const user = await User.findById(userId);
    const otherUser = await User.findById(followId);

    if (user.following.includes(followId)) {
      user.following.pull(followId);
      otherUser.followers.pull(userId);
      await user.save();
      await otherUser.save();
      return res.status(200).json({ message: "Unfollowed!" });
    } else {
      user.following.push(followId);
      otherUser.followers.push(userId);
      await user.save();
      await otherUser.save();
      return res.status(200).json({ message: "Followed!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong", err });
  }
};

export default handler;
