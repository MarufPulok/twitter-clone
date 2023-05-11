import User from "../../models/User"

const handler = async (req, res) => {
    if (req.method === "PATCH") {
        const userId = req.query.id
        const { name, username, email } = req.body

        try {
            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({ error: "User not found" })
            }

            name !== user.name && (user.name = name)
            username !== user.username && (user.username = username)
            email !== user.email && (user.email = email)

            await user.save()

            res.status(200).json({ message: "Profile updated successfully", user })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: "Something went wrong" })
        }
    } 
}

export default handler