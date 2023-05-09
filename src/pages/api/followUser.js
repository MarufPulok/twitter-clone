import User from '../../models/User'

const handler = async (req, res) => {
    const id = req.query.id
    const currentUserId = req.body.currentUserId
    if (req.method === 'POST') {
        try {
            const user = await User.findById(currentUserId)
            const userToFollow = await User.findById(id)
            if (user.following.includes(id)) {
                await user.following.pull(id)
                await userToFollow.followers.pull(currentUserId)
            } else {
                await user.following.push(id)
                await userToFollow.followers.push(currentUserId)
            }
            await user.save()
            await userToFollow.save()
            
            res.status(201).json({ message: 'User followed', user })
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Something went wrong', err })
        }
    }
}

export default handler
