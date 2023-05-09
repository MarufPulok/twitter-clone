import User from "../../models/User"

const handler = async (req, res) => {
    if (req.method === "GET") {
        const currentUser = req.query.id;
        try {
            const users = await User.find();
            const user = await User.findById(currentUser);
            
            const updatedUsers = users.map(u => {
                const isFollowed = user.following.includes(u._id.toString());
                return {
                    ...u._doc,
                    isFollowed,
                }
            });
            
            return res.status(200).json({ users: updatedUsers });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Something went wrong", err });
        }
    }
}

export default handler
