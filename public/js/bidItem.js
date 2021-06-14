// get the current bidding item id
const item_id = document.location.href.split("/")[4];

// request to back end for bidding item
const bidItem = async (price) => {
  console.log(item_id);

  let response = await fetch(`/api/products/${item_id}/bid`, {
    method: "POST",
    body: JSON.stringify({ price }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.ok) {
    document.location.reload();
  }
};

let buttons = document.querySelectorAll(".bidBtns");

for (let button of buttons) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    let bidAmount = Number(event.target.textContent.trim());
    bidItem(bidAmount);
  });
}

document.querySelector("#customBidBtn").addEventListener("click", () => {
  let customBid = Number(document.querySelector("#bid-form").textContent.trim());
  if (customBid > 0) {
    bidItem(customBid);
  }
});
