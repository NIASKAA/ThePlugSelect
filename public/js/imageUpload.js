const cloudinary = require('../config/cloudinary');
const Formidable = require('formidable');


const uploadImage = () => {
    if(req.method.toLowerCase() === 'post'){
        const form = new Formidable();

        form.parse(req, (files) => {

            cloudinary.uploader.upload(files.upload.path, result => {

                console.log(result)
                if (result.public_id) {
                    alert("Uploaded Image");
                }
            }
            );
        });
        return;
};}

uploadImage();