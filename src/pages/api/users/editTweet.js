import Tweet from "../../../models/Tweet";

const handler = async (req, res) => {
    if (req.method === "PATCH") {
        const { tweetId, text } = req.body;
        try {
            const tweet = await Tweet.findById(tweetId);
            if (!tweet) {
                return res.status(404).json({ message: "Tweet not found" });
            }
            text !== tweet.text && (tweet.text = text);
            text === tweet.text && (tweet.text = tweet.text);
            await tweet.save();
            return res.status(200).json({ message: "Tweet edited!", tweet });
        }
        catch (err) {
            console.log(err.message);
            return res.status(500).json({ message: "Something went wrong", err });
        }
    }
}

export default handler;