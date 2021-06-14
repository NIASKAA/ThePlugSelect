const uploadImage = async () => {
  const inputImage = document.querySelector("#file").files[0];
  const formData = new FormData();
  formData.append("image", inputImage);
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    formData: { image: formData.get("image") },
  });
  const data = await response.json();
  return JSON.stringify(data.image);
};

//document.querySelector(".addBtn").addEventListener("click", uploadReq);
