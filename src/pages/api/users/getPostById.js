import Tweet from "../../../models/Tweet";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            const tweet = await Tweet.findById(id);
            res.status(200).json({ tweet });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Server error" });
        }
    }
}

export default handler;