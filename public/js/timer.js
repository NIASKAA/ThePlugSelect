// Bid timer setup

let chatBox = document.querySelector(".msgBody");
let bidButtons = document.querySelector(".cardEnd");
let timer = document.getElementById("bid-timer").innerHTML;

function hideButtons() {
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => button.setAttribute("style", "display:none"));
}

function showButtons() {
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => button.setAttribute("style", "display:"));
}

function endAuction() {
  let auctions = document.querySelectorAll(".render-message");
  let winnerBid = auctions[auctions.length - 1].textContent.trim().split(" ");
  let winnerMessage = `<div class="render-message"> Item sold to ${winnerBid[0]} with a bid of $ ${winnerBid[2]}</div>`;
  hideButtons();
  bidButtons.innerHTML = `<h5 class="itemName"> Auction ended </h5>`;
  chatBox.innerHTML = winnerMessage;
}

function auctionTimer(num) {
  var counter = setInterval(function () {
    document.getElementById("bid-timer").innerHTML = new Date(num * 1000)
      .toISOString()
      .substr(11, 8);
    if (num <= 0) {
      clearInterval(counter);
      endAuction();
    }
    num--;
  }, 1000);
}


function setTimer(num) {
  hideButtons();
  var counter = setInterval(function () {
    document.getElementById("timer").innerHTML = num;
    if (num <= 0) {
      clearInterval(counter);
      showButtons();
      auctionTimer(30);
    }
    num--;
  }, 1000);
}

setTimer(10);




