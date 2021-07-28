// Bid timer setup
let chatBox = document.querySelector(".msgBody");
let bidButtons = document.querySelector(".cardEnd");
let timer = document.getElementById("bid-timer").innerHTML;
let endTime = document.querySelector("#endTime").dataset.endtime;
var counter;
// item_id = document.location.href.split("/")[4]; this variable is defined in bidItem.js which runs on the same page so there's no need to declare it

function hideButtons() {
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => button.setAttribute("style", "display:none"));
}

function showButtons() {
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => button.setAttribute("style", "display:"));
}

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

// wraps up all of the
function endAuction() {
  try {
    let auctions = document.querySelectorAll(".render-message");
    let winnerBid = auctions[auctions.length - 1].textContent.trim().split(" ");
    let winnerMessage = `<div class="render-message"> Item sold to ${winnerBid[0]} with a bid of $ ${winnerBid[2]}</div>`;
    chatBox.innerHTML = winnerMessage;
  } catch (e) {
    console.log(e);
  } finally {
    hideButtons();
    setAuctionWinner();
    bidButtons.innerHTML = `<h5 class="itemName"> Auction ended </h5>`;
  }
}

// this function simply call for the server to set the auction winner. all login is handled on the server
async function setAuctionWinner() {
  // if (!getTimeRemaining(endTime).total <= 0) return // guard clause to make sure the time for bidding is over
  const response = await fetch(`/api/products/${item_id}/win`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  const winner = await response.json();
  console.log(winner)
}

// this function makes a countdown from the current date to the date the bid expires
// the deadline is extracted from the item's end date
function auctionTimer(deadline) {
  counter = setInterval(function () {
    const t = getTimeRemaining(deadline);
    const timer = document.getElementById("bid-timer");
    timer.innerHTML =
      t.days + " days " + t.hours + " hours " + t.minutes + " minutes " + t.seconds + " seconds ";
    if (t.total <= 0) {
      clearInterval(counter);
      endAuction();
    }
  }, 1000);
}

// for demonstration purposes only: takes in an integer and sets the auction end to that time in minutesin the future;
// achieved with global variable hackiness (good coding practice would probably involve us creating a timer class with set deadline and methods and such!!!!!)
const setNewDeadlineInMinutes = (time) => {
  let newDeadline = new Date(new Date().getTime() + time * 60000);
  clearInterval(counter);
  auctionTimer(newDeadline);
};

showButtons();
auctionTimer(endTime);
