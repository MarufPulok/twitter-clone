import Tweet from "../../../models/Tweet";
import User from "../../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { userId, tweetId, commentId, text } = req.body;
      const tweet = await Tweet.findById(tweetId);
      const comment = await tweet.comments.id(commentId);
      
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      const user = await User.findById(userId);
      const reply = {
        user: {
          _id: user._id,
          name: user.name,
          username: user.username,
        },
        tweet: tweetId,
        text,
      };
      await comment.commentReplies.push(reply);
      await tweet.save();
      return res.status(201).json({ message: "Reply created!", reply });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
