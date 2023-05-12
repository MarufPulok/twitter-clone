import Tweet from "../../../models/Tweet";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
        
      const { offset = 0 } = req.query.page;
      console.log(req.query.page)
      const limit = 5;
      const tweets = await Tweet.find()
        .populate("user", "name username dp")
        .sort({ createdAt: -1 })
        .skip(req.query.page)
        .limit(limit);

      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      return res.status(200).json({
        message: "Tweets fetched!",
        tweets,
        nextOffset: parseInt(offset) + limit,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Something went wrong",
        error: err.message,
      });
    }
  }
};

export default handler;

