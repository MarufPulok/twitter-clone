import formidable from "formidable";
import path from "path";
export const parseForm = async (req, location = "tweets") => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "public", "images", location),
      keepExtensions: true,
    });
    form.parse(req, function (err, fields, files) {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
};

// const options: formidable.Options = {};
// if (saveLocally) {
//   options.uploadDir = path.join(process.cwd(), "/public/images");
//   options.filename = (name, ext, path, form) => {
//     return Date.now().toString() + "_" + path.originalFilename;
//   };
// }
// options.maxFileSize = 4000 * 1024 * 1024;
// const form = formidable(options);
// return new Promise((resolve, reject) => {
//   form.parse(req, (err, fields, files) => {
//     if (err) reject(err);
//     resolve({ fields, files });
//   });
// });
