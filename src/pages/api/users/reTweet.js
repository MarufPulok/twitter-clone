import User from "../../../models/User";
import Tweet from "../../../models/Tweet";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { tweetId, userId, text } = req.body;
      const tweet = await Tweet.findById(tweetId);
      console.log(tweet);
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
      if (!tweet) {
        return res.status(400).json({ message: "Tweet does not exist" });
      }

      const newTweet = await Tweet.create({
        user: user._id,
        text,
        images: [],
        likes: [],
        retweets: [],
        comments: [],
        retweet: {
          isRetweet: true,
          tweet: tweet.id,
          retweetCreatedAt: Date.now(),
        },
      });

      user.tweets.push(newTweet.id);
      user.save();
      tweet.numberOfRetweets += 1;
      tweet.save();
      res.status(200).json({ message: "Retweet successful" }, newTweet);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default handler;
