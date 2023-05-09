import Comment from "@/models/Comment";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const commentId = req.query.id;
      const comment = await Comment.findById(commentId);
      const replies = await Comment.find({
        _id: { $in: comment.commentReplies },
      })
        .populate("commentAuthor")
        .sort({ commentCreatedAt: -1 });

      res.status(200).json({ message: "Replies fetched", replies });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong", error });
    }
  }
};

export default handler;
