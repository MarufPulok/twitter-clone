import Tweet from "../../../models/Tweet";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { tweetId } = req.query;
      const tweet = await Tweet.findById(tweetId);
      if (!tweet) {
        return res.status(404).json({ message: "Tweet not found" });
      }
      const comments = await Tweet.findById(tweetId)
        .populate({
          path: "comments",
          populate: { path: "user", select: "name username dp" },
          options: { sort: { commentCreatedAt: -1 } },
        })
        .select("comments");
        const tweetComments = comments.comments;
      return res.status(200).json({ message: "Comments found!", tweetComments });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
