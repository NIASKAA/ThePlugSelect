// Bid timer setup
// let auctionTimer = 10000;

var countdown = setInterval(function(auctionTimer) {

    if (auctionTimer <= 0) {
        clearInterval(countdown);
        document.getElementById("bid-timer").innerHTML = "The auction is now over."
    } else {
        let hours = Math.floor((auctionTimer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((auctionTimer % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((auctionTimer % (1000 * 60) / 1000));
        document.getElementById('bid-timer').innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    }

    auctionTimer--;
    
}, 1000);


 



