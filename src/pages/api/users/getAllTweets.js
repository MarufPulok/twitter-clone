// import Tweet from "@/models/Tweet"
// import User from "@/models/User"

// const handler = async (req, res) => {
//     if (req.method === "GET") {
//         try {
//         const tweets = await Tweet.find()
//             .populate("user", "name username dp")
//             .sort({ createdAt: -1 });
//         return res.status(200).json({ message: "Tweets fetched!", tweets });
//         } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Something went wrong", err });
//         }
//     }
// }

// export default handler

//with pagination
// import Tweet from "@/models/Tweet"
// import { sk } from "date-fns/locale";

// const handler = async (req, res) => {
//     if (req.method === "GET") {
//         try {
//             const { offset = 0 } = req.query;
//             const tweets = await Tweet.find()
//                 .populate("user", "name username dp")
//                 .sort({ createdAt: -1 })
//                 skip(parseInt(offset))
//                 .limit(5);
//             return res.status(200).json({ message: "Tweets fetched!", tweets, nextOffset: parseInt(offset) + tweets.length });
//         } catch (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Something went wrong", error: err.message });
//         }
//     }
// }

// export default handler

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

