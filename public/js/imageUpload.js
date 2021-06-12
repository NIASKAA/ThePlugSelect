

const uploadImage = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    console.log(file);
}


document.querySelector('#file').addEventListener("change", uploadImage);