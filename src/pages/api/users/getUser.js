import User from "../../../models/User";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const email = req.query.email
            const user = await User.find({email: email})
            return res.status(200).json({user})
        } catch(err) {
            console.log(err.message)
            return res.status(500).json({ message: 'Something went wrong', err })
        }
    }
}

export default handler;