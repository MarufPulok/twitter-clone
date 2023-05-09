import Tweet from "../../../models/Tweet";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { userId, tweetId, text } = req.body;
    try {
      const tweet = await Tweet.findById(tweetId);

      const comment = {
        user: userId,
        tweet: tweetId,
        text,
        commentReplies: [],
      };
      await tweet.comments.push(comment);
      await tweet.save();

      res.status(201).json({ message: "Comment created!", comment });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
