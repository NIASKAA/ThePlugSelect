async function newFormHandler(event) {
   event.preventDefault();
   let image = await uploadImage();
   image = image.substring(1, image.length - 1);
   const product_name = document.querySelector('input[name="post-title"]').value;
   const description = document.querySelector('input[name="bid-content"]').value;
   const size = document.querySelector('input[name="bid-content-size"]').value;
   const price = Number(document.querySelector('input[name="bid-content-price"]').value);
   const stock = 1;
   const startDate = document.querySelector('input[name="bid-content-bid-start"]');
   const endDate = document.querySelector('input[name="bid-content-bid-end"]');

   const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
         product_name,
         description,
         price,
         size,
         stock,
         image,
         startDate,
         endDate,
      }),
      headers: {
         "Content-Type": "application/json",
      },
   });

   if (response.ok) {
      document.location.replace("/");
   } else {
      alert(response.statusText);
   }
}

document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);
