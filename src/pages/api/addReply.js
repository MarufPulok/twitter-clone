import Comment from "@/models/Comment";
import User from "@/models/User";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const commentId = req.query.id
            const user = await User.findById(req.body.userId);
            const comment = await Comment.findById(commentId);
            const reply = await Comment.create({
                commentAuthor: user._id,
                commentContent: req.body.commentContent,
                isReply: true,
            });
            const createdReply = await reply.save();
            await comment.commentReplies.push(createdReply._id);
            await comment.save();
            res.status(201).json({ message: "Reply created", createdReply });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Something went wrong", error });
        }
    }
}

export default handler;