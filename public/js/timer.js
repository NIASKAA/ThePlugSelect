// Bid timer setup
let chatBox = document.querySelector(".msgBody");
let bidButtons = document.querySelector(".cardEnd");
let timer = document.getElementById("bid-timer").innerHTML;
const endTime = document.querySelector("#endTime").dataset.endtime;

console.log(endTime);
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

function endAuction() {
   let auctions = document.querySelectorAll(".render-message");
   let winnerBid = auctions[auctions.length - 1].textContent.trim().split(" ");
   let winnerMessage = `<div class="render-message"> Item sold to ${winnerBid[0]} with a bid of $ ${winnerBid[2]}</div>`;
   hideButtons();
   bidButtons.innerHTML = `<h5 class="itemName"> Auction ended </h5>`;
   chatBox.innerHTML = winnerMessage;
}

function auctionTimer(deadline) {
   var counter = setInterval(function () {
      const t = getTimeRemaining(deadline);
      const timer = document.getElementById("bid-timer");
      timer.innerHTML =
         "days: " +
         t.days +
         "<br>" +
         "hours: " +
         t.hours +
         "<br>" +
         "minutes: " +
         t.minutes +
         "<br>" +
         "seconds: " +
         t.seconds;
      if (num <= 0) {
         clearInterval(counter);
         endAuction();
      }
      num--;
   }, 1000);
}

showButtons();
auctionTimer(endTime);
endTimer();
