import User from "@/models/User";

const handler = async (req, res) => {
    if (req.method !== "GET") return res.status(400).json({ message: "Only GET requests allowed" });
    else {
        try {
            const { search } = req.query;
            const users = await User.find({
              $or: [
                { username: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
              ]
            }).select({ username: 1, dp: 1, email: 1 });
        
            res.status(200).json(users);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default handler;