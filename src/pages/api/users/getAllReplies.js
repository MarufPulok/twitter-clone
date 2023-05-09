import Tweet from "../../../models/Tweet";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { commentId } = req.query;
      const comment = await Tweet.findOne({ "comments._id": commentId })
        .select("comments.$")
        .populate({
          path: "comments.commentReplies.user",
          select: "name username dp",
        })
        .exec();

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      const commentReplies = comment.comments[0].commentReplies;

      return res.status(200).json({
        message: "Comment replies found!",
        commentReplies,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
