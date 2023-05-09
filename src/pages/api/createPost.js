// only post
import connect from "@/db/connect"
import Post from "@/models/Post"
import User from "@/models/User"

const handler = async(req, res) => {
    if (req.method === 'POST') {
        try {
            await connect()
            const author = await User.findOne({email: req.body.email})
            console.log(author)
            console.log(author._id)
            const post = await Post.create({
                postAuthor: author._id,
                postContent: req.body.postContent,
            })

            const createdPost = await post.save()
            res.status(201).json({ message: 'Post created', createdPost })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Something went wrong', err })
        }
    }
}

// export default handler

//post with single image
// import connect from "@/db/connect";
// import Post from "@/models/Post";
// import User from "@/models/User";
// import formidable from "formidable";
// import fs from "fs";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export const parseForm = async (req) => {
//   return new Promise((resolve, reject) => {
//     const form = new formidable.IncomingForm({
//       uploadDir: path.join(process.cwd(), "public", "images"),
//       keepExtensions: true,
//     });
//     form.parse(req, function (err, fields, files) {
//       if (err) return reject(err);
//       resolve({ fields, files });
//     });
//   });
// };

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     try {
//       await connect();
//       const { fields, files } = await parseForm(req);

//       const email = fields.email;
//       let image = null;
//       if (files.postImages) {
//         image = files.postImages.newFilename;
//       }

//       console.log(image);
//       const postAuthor = await User.findOne({ email: email });

//       const postContent = fields.postContent;

//       const newPost = await Post.create({
//         postAuthor: postAuthor._id,
//         postContent: postContent,
//         postImages: image,
//       });

//       const createdPost = await newPost.save();
//       res.status(201).json({ message: "Post created", createdPost });
//     } catch (err) {
//       console.log(err.message);
//       return res
//         .status(500)
//         .json({ message: "Something went wrong", error: err });
//     }
//   }
// };

// export default handler;

//test multiple image upload
// import connect from "@/db/connect";
// import Post from "@/models/Post";
// import User from "@/models/User";
// import formidable from "formidable";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export const parseForm = async (req) => {
//   return new Promise((resolve, reject) => {
//     const form = new formidable.IncomingForm({
//       uploadDir: path.join(process.cwd(), "public", "images"),
//       keepExtensions: true,
//       multiples: true,
//     });
//     form.parse(req, function (err, fields, files) {
//       if (err) return reject(err);
//       resolve({ fields, files });
//     });
//   });
// };

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     try {
//       await connect();
//       const { fields, files } = await parseForm(req);

//       const email = fields.email;
//       let images = [];
//       if (files.postImages) {
//         if (Array.isArray(files.postImages)) {
//           for (let file of files.postImages) {
//             images.push(file.newFilename);
//           }
//         } else if (files.postImages.newFilename) {
//           images.push(files.postImages.newFilename);
//         } else {
//           console.log(files.postImages)
//           images.push(null);
//         }
//       }

//       console.log(images);
//       const postAuthor = await User.findOne({ email: email });

//       const postContent = fields.postContent;

//       const newPost = await Post.create({
//         postAuthor: postAuthor._id,
//         postContent: postContent,
//         postImages: images,
//       });

//       const createdPost = await newPost.save();
//       res.status(201).json({ message: "Post created", createdPost });
//     } catch (err) {
//       console.log(err.message);
//       return res
//         .status(500)
//         .json({ message: "Something went wrong", error: err });
//     }
//   }
// };

// export default handler;
