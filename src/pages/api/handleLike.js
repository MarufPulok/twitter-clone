import Post from "@/models/Post";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const postId = req.query.id;
      const userId = req.body.id;
      // console.log(postId, userId)
      const post = await Post.findById(postId);
      // console.log(post)
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      const isLiked = await post.postLikes.some((likedUserId) => likedUserId.toString() === userId);
      // console.log(isLiked)
      if (isLiked) {
        post.postLikes.pull(userId);
        await post.save();
        return res.status(200).json({ message: "Post unliked" }, post);
      } else {
        post.postLikes.push(userId);
        await post.save();
        return res.status(200).json({ message: "Post liked" }, post);
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
