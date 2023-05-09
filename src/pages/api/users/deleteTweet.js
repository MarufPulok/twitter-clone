import Tweet from "../../../models/Tweet"

const handler = async (req, res) => {
    if (req.method === "DELETE") {
        const { tweetId } = req.body;
        try {
            const tweet = await Tweet.findById(tweetId);
            if (!tweet) {
                return res.status(404).json({ message: "Tweet not found" });
            }
            await Tweet.deleteOne({ _id: tweetId });
            return res.status(200).json({ message: "Tweet deleted!" });
        }
        catch (err) {
            console.log(err.message);
            return res.status(500).json({ message: "Something went wrong", err });
        }
    }
}

export default handler