// Bid timer setup
let chatBox = document.querySelector(".msgBody");
let bidButtons = document.querySelector(".cardEnd");
let timer = document.getElementById("bid-timer").innerHTML;
let endTime = document.querySelector("#endTime").dataset.endtime;

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
   let auctions = document.querySelectorAll(".render-message");
   let winnerBid = auctions[auctions.length - 1].textContent.trim().split(" ");
   let winnerMessage = `<div class="render-message"> Item sold to ${winnerBid[0]} with a bid of $ ${winnerBid[2]}</div>`;
   hideButtons();
   setAuctionWinner();
   bidButtons.innerHTML = `<h5 class="itemName"> Auction ended </h5>`;
   chatBox.innerHTML = winnerMessage;
}

// this function simply call for the server to set the auction winner. all login is handled on the server
async function setAuctionWinner() {
  // if (!getTimeRemaining(endTime).total <= 0) return // guard clause to make sure the time for bidding is over
   const response = await fetch(`/api/products/${item_id}/win`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
   });
   console.log(response);
}

// this function makes a countdown from the current date to the date the bid expires
// the deadline is extracted from the item's end date
function auctionTimer(deadline) {
   var counter = setInterval(function () {
      const t = getTimeRemaining(deadline);
      const timer = document.getElementById("bid-timer");
      timer.innerHTML =
         " days: " +
         t.days +
         " hours: " +
         t.hours +
         " minutes: " +
         t.minutes +
         " seconds: " +
         t.seconds;
      if (t.total <= 0) {
         clearInterval(counter);
         endAuction();
      }
   }, 1000);
}

showButtons();
auctionTimer(endTime);
