import User from "@/models/User";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const user = await User.findById(req.query.id).populate('followers', 'name username dp')
            res.status(200).json({ followers: user.followers })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default handler;