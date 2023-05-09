import Post from '@/models/Post'

const handler = async (req, res) => {
    if (req.method === 'PATCH') {
        try {
            const {content} = req.body;
            const postId = req.query.id;
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' })
            }
            content !== post.postContent && (post.postContent = content);
            await post.save();
            return res.status(200).json({ message: 'Post updated successfully', post })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Something went wrong', err })
        }
    }
}

export default handler