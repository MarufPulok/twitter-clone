import Tweet from "../../../models/Tweet";
import User from "../../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { tweetId, userId } = req.body;
      const user = await User.findById(userId);
      const tweet = await Tweet.findById(tweetId);
      if (!tweet) {
        return res.status(404).json({ message: "Tweet not found" });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (tweet.likes.includes(userId)) {
        tweet.likes = tweet.likes.filter((id) => !id.equals(userId));

        await tweet.save();
        return res.status(200).json({ message: "Post unliked" });
      } else {
        tweet.likes.push(userId);
        await tweet.save();
        return res.status(200).json({ message: "Post liked" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default handler;
