const router = require("express").Router();
const cloudinary = require("../../config/cloudinary");
const upload = require('../../config/multer')
const fs = require("fs");
require('dotenv').config();


router.post('/', upload.single('image'), async(req, res) => {
  try {
    //const result = await cloudinary.uploader.upload(req.body)
    console.log(req.file)
    res.status(200).json(req.body);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
})

router.get('/test', async(req, res) => {
  res.status(200).send("This works!");
})
module.exports = router;