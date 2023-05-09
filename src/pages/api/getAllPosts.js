import Post from "@/models/Post";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // await connect()
      const posts = await Post.find({})
        .populate("postAuthor", "name username dp")
        .sort({ postCreatedAt: -1 });

      res.status(200).json({ message: "Posts fetched", posts });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;
