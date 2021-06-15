const uploadProfilePic = async (event) => {
   event.preventDefault();
   let image = await uploadImage();
   let profile_picture = String(image.substring(1, image.length - 1));

   const response = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({"profile_picture": profile_picture}),
      headers: {
         "Content-Type": "application/json",
      },
   });
   console.log(response);
   if (response.ok) {
      document.location.reload();
   } else {
      alert(response.statusText);
   }
};

document.querySelector(".addBtn").addEventListener("click", uploadProfilePic);
