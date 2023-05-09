import Post from "@/models/Post";
import Comment from "@/models/Comment";


const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const postId = req.query.id;
      await Post.findByIdAndDelete(postId);
      //delete comments of that post
      const comments = Post.find({ post: postId });
      comments.forEach(async (comment) => {
        await Comment.findByIdAndDelete(comment._id);
      });

      return res.status(200).json({ message: "Post deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
