// get the current bidding item id
const item_id = document.location.href.split("/")[4];

let currentPrice = Number(
  document.querySelector("#price").textContent.split(":")[1]
);
const chat = document.querySelector(".chat-form")

// request to back end for bidding item
const bidItem = async (price) => {
  if (price > currentPrice) {
    let response = await fetch(`/api/products/${item_id}/bid`, {
      method: "POST",
      body: JSON.stringify({ price }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      
    }
  } else {
    return;
  }
};

let buttons = document.querySelectorAll(".bidBtns");

for (let button of buttons) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    let bidAmount = Number(event.target.textContent.trim());
    let date = new Date();
    let message = `User bids ${bidAmount} ----- ${time}`
    socket.emit('chat', message)
    bidItem(bidAmount);
  });
}

document.querySelector("#customBidBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let today = new Date();
  let time = today.toUTCString();
  let customBid = Number(document.querySelector("#bid-form").value.trim());
  let message = `User bids ${customBid} ----  ${time}`
  socket.emit('chat', message)
  if (customBid > 0) {
    bidItem(customBid);
  }
});


