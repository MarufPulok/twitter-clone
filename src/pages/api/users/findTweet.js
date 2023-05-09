import Tweet from "../../../models/Tweet";
import User from "../../../models/User";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { tweetId } = req.query;
      const tweet = await Tweet.findById(tweetId);
      const user = await User.findById(tweet.user).select('name username dp');
      if (!tweet) {
        return res.status(400).json({ message: "Tweet does not exist" });
      }
      
      res.status(200).json({tweet, user});
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default handler;
