// get the current bidding item id
let item_id = document.location.href.split("/")[4];
let user = document.querySelector(".userName").textContent.trim();
let currentPrice = Number(document.querySelector("#currentPrice").textContent);
const chat = document.querySelector(".chat-window");
const userName = document.querySelector(".userName").textContent.trim();
// room number is just room+itemID
room = `room${item_id}`;

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

// adding an event listener to submit bit for all the buttons
let buttons = document.querySelectorAll(".bidBtns");
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    let today = new Date();
    let time = today.toLocaleTimeString();
    let bidAmount = Number(event.target.textContent.trim());
    let message = `${user} bids ${bidAmount} == ${time}`;
    if (bidAmount > currentPrice) {
      socket.emit("bid", { bid: message, room: room });
      // request to back end
      bidItem(bidAmount);
      // set the current price as the amout that was bid
      currentPrice = bidAmount;
      // update the DOM element containing the price and add the little animation
      document.querySelector("#currentPrice").textContent = bidAmount;
      setPriceToRed();
    } else {
      alert("A bid must be greater than the current price");
    }
  });
}

// this handles the bidding for a custom bid
document.querySelector("#customBidBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let today = new Date();
  let time = today.toLocaleTimeString();
  let customBid = Number(document.querySelector("#bid-form").value.trim());
  let message = `${user} bids ${customBid} ==  ${time}`;
  if (customBid > currentPrice) {
    // pass the room to the emit function so the server tells which
    // room it was sent from
    socket.emit("bid", { bid: message, room: room });
    bidItem(customBid);
    currentPrice = customBid;
    document.querySelector("#currentPrice").textContent = customBid;
    setPriceToRed();
  } else {
    alert("A bid must be greater than the current price");
  }
});

// this function sets the price's color to red for a few seconds when a bid happens
// superfluous at best
const setPriceToRed = () => {
  const price = document.querySelector("#currentPrice");
  price.setAttribute("class", "increasePrice");
  setTimeout(function () {
    price.setAttribute("class", "");
  }, 2000);
};

