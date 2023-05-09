import Comment from "@/models/Comment";

const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            const id = req.query.id;
            console.log(id)
            const comment = await Comment.findById(id);
            console.log(comment)
            res.status(200).json({comment});
        } catch (error) {
            res.status(400).json({error: "Something went wrong"});
        }
    }
}

export default handler;