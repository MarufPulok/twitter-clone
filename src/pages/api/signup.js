import connect from "@/db/connect"
import User from "@/models/User"
import bcrypt from "bcrypt"

const handler = async(req, res) => {
    if (req.method === 'POST') {
        try {
            await connect()
            const {name, username, email, password} = req.body
            const existingUser = await User.findOne({
                $or: [{ email: email }, { username: username }]
              })
             
            if(existingUser) {
                return res.status(400).json({message: 'user exists'})
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const user = await User.create({
                name,
                username,
                email,
                password: hashedPassword
            })
            console.log(user)
            return res.status(201).json({message: 'User created!',user}) 
        } catch(err) {
            console.log(err)
            return res.status(500).json({ message: 'Something went wrong', err })
        }
    }
    return res.status(400).json({ message: 'Invalid request method'})
}

export default handler