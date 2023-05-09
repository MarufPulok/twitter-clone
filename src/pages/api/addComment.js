import Post from "@/models/Post";
import User from "@/models/User";
import Comment from "@/models/Comment";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const postId = req.query.postId;
            // console.log(postId)
            const user = await User.findById(req.body.userId);
            // console.log(user)
            const post = await Post.findById(postId);
            // console.log(post)

            const comment = await Comment.create({
                commentPost: post._id,
                commentAuthor: user._id,
                commentContent: req.body.commentContent,
            });

            const createdComment = await comment.save();
            await post.postComments.push(createdComment._id);
            await post.save();
            // console.log(post)
            res.status(201).json({ message: 'Comment created', createdComment })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Something went wrong', err })
        }
    }
}

export default handler;