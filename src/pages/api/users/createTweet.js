import User from "../../../models/User";
import Tweet from "../../../models/Tweet";
import formidable from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "public", "images"),
      keepExtensions: true,
      multiples: true,
    });
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { fields, files } = await parseForm(req);
      console.log(fields, files);
      const email = fields.email;
      let images = [];
      if (files.postImages) {
        if (Array.isArray(files.postImages)) {
          for (let file of files.postImages) {
            images.push(file.newFilename);
          }
        } else if (files.postImages.newFilename) {
          images.push(files.postImages.newFilename);
        } else {
          console.log(files.postImages);
          images.push(null);
        }
      }
      const user = await User.findOne({ email: email });
      const text = fields.text;

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
      const newTweet = await Tweet.create({
        user: user._id,
        text,
        images,
        likes: [],
        retweets: [],
        comments: [],
      });
      
      user.tweets.push(newTweet.id);
      await user.save();
      newTweet.user = user;
      console.log(newTweet);
      return res.status(201).json({ message: "Tweet created!", newTweet});
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default handler;


