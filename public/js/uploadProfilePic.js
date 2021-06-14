const uploadProfilePic = async (event) => {
    event.preventDefault();
    let image = await uploadImage();
    image = image.substring(1, image.length - 1);
    console.log(image);

}