const multer = require("multer");
const path = require("path");
module.exports = multer({
  storage: multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null,'Images')
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== "jpg" && ext !== "jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
