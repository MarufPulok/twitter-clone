import Comment from "@/models/Comment";
import Post from "@/models/Post";

const handler = async (req, res) => {
    if (req.method === 'DELETE') {
        try {
            const commentId = req.query.id;
            const comment = await Comment.findById(commentId);
            const post = await Post.findById(comment.commentPost);

            console.log(post)
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' })
            }
            await comment.deleteOne();
            await post.updateOne({ $pull: { postComments: commentId } })
            
            res.status(201).json({ message: 'Comment deleted' })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Something went wrong', err })
        }
    }
}

export default handler;
