import Post from "@/models/Post";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const postId = req.query.id;
      const post = await Post.findById(postId);
      res.status(200).json({ message: "Post fetched", post });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
