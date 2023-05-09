import Tweet from "../../../models/Tweet";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { tweetId, commentId } = req.body;
    try {
      const tweet = await Tweet.findById(tweetId);
      const comment = await tweet.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      await tweet.comments.pull(commentId);
      await tweet.save();
      return res.status(200).json({ message: "Comment deleted!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
