import User from "../../models/User";
import formidable from "formidable";
import path from "path";
import connect from "../../db/connect";

export const config = {
    api: {
        bodyParser: false
    }
}

export const parseForm = async (req) => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({
            uploadDir: path.join(process.cwd(), "public", "images"),
            keepExtensions: true
        });
        form.parse(req, function(err, fields, files) {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
}

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            await connect();
            const { fields, files } = await parseForm(req);
            const email = fields.email;
            let image = null;

            if (files.dp) {
                image = files.dp.newFilename;
            }

            const user = await User.findOne({ email: email });
            user.dp = image;
            await user.save();
            res.status(200).json({ message: "Profile picture updated" }, user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

export default handler;