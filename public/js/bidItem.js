// get the current bidding item id
let item_id = document.location.href.split("/")[4];
const userName = document.querySelector(".userName").textContent.trim();
let currentPrice = Number(
  document.querySelector("#price").textContent.split(":")[1]
);
const chat = document.querySelector(".chat-window");

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
  } else {
    return;
  }
};

let buttons = document.querySelectorAll(".bidBtns");

for (let button of buttons) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    let today = new Date();
    let time = today.toLocaleTimeString();
    let bidAmount = Number(event.target.textContent.trim());
    let message = `bids ${bidAmount} == ${time}`;
    if (bidAmount > currentPrice) {
      socket.emit("chatForm", message);
      bidItem(bidAmount);
    } else {
      alert("A bid must be greater than the current price");
    }
  });
}

document.querySelector("#customBidBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let today = new Date();
  let time = today.toLocaleTimeString();
  let customBid = Number(document.querySelector("#bid-form").value.trim());
  let message = `bids ${customBid} ==  ${time}`;
  if (customBid > currentPrice) {
    socket.emit("chatForm", message);
    bidItem(customBid);
  } else {
    alert("A bid must be greater than the current price");
  }
});
