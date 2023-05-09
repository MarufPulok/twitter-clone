import Tweet from "../../models/Tweet";
import User from "../../models/User";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const user = await User.findOne({ _id: req.query.id });
            const posts = await Tweet.find({ user: user })
                .populate('user', 'name username dp')
                .sort({ createdAt: -1 });
            res.status(200).json({ message: "User posts fetched", user, posts });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Something went wrong", err });
        }
    }
}

export default handler;
