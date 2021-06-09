const { compareSync } = require("bcrypt");
const ImageKit = require("imageKit");
const imageKit = new ImageKit({
    publicKey: "",
    privateKey: "",
    urlEndpoint: ""
});

// Image upload function //
imageKit.upload({
    file: "",
    fileName: "",
})
.then(res => {
    console.log(response);
})
.catch(err => {
    console.log(err);
});