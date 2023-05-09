import Comment from "@/models/Comment";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const postId = req.query.postId;
      const comments = await Comment.find({ commentPost: postId })
        .populate("commentAuthor")
        .populate("commentPost")
        .populate("commentReplies")
        .populate("commentCreatedAt")
        .sort({ commentCreatedAt: -1 });
      res.status(200).json({ comments });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
