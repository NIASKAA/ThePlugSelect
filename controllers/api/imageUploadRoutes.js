const router = require("express").Router();
const cloudinary = require("cloudinary");
const upload = require("../../config/multer");
const fs = require("fs");
const formidable = require('formidable');
require("dotenv").config();

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET,
});

// router.post("/", (req, res, next) => {
//    stream = cloudinary.uploader.upload_stream(
//       function (result) {
//          console.log(result);
//          console.log("\n\n\n\n" + req.body + "\n\n\n\n\n\n");
//          res.send(
//             'Done:<br/> <img src="' +
//                result.url +
//                '"/><br/>' +
//                cloudinary.image(result.public_id, {
//                   format: "png",
//                   width: 100,
//                   height: 130,
//                   crop: "fill",
//                })
//          );
//       },
//       { public_id: req.body.title }
//    );
//    fs.createReadStream(req.files.image.path, { encoding: "binary" })
//       .on("data", stream.write)
//       .on("end", stream.end);
// });


router.post("/test", async (req, res) => {
  try {
  console.log(req.files)
   res.status(200).json(req.files);
  }
  catch (err) {
    console.log(err);
  }
});


router.post("/", async (req, res) => {
   const form = new formidable.IncomingForm();
   form.parse(req, async (err, fields, files) => {
      const image = await cloudinary.uploader.upload(files.image.path, {
         resource_type: "image",
         public_id: `users/${req.userid}/${files.name}`,
         crop: "scale",
         quality: "auto",
      });
      res.append( "imageURL", image.secure_url);
      console.log("img uploaded", image.secure_url);
      return res.send({ image: image.secure_url });
      //res.writeHead(200, { "content-type": "application/json" });
      //res.end(JSON.stringify({ fields, files }, null, 2));
   });
   return;
});

router.post("/formidable", async (req, res) => {
   const form = formidable({ multiples: true });
   form.parse(req, async (err, fields, files) => {
      const image = await cloudinary.uploader.upload(files.image.path, {
         resource_type: "image",
         public_id: `users/${req.userid}/${files.name}`,
         crop: "scale",
         quality: "auto",
      });
      console.log("img uploaded", image.secure_url);
      res.json({ image: image.secure_url });
      cloudinary.image(image.secure_url, {type: "fetch"})      
      //res.writeHead(200, { "content-type": "application/json" });
      //res.end(JSON.stringify({ fields, files }, null, 2));
   });
   return;
});
module.exports = router;



