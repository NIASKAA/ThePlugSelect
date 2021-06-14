// Chatroom setup
let FADE_TIME = 150;
let TYPING_TIMER_LENGTH = 400;

let window = window;
let setTimeout;
let usernameInput = document.getElementById("usernameInput");
let messages = document.getElementById("messages");
let rightLogMsg = document.getElementById("rightLogMsg");
let allBidsLogs = document.getElementById("allBidsLogs");
let inputMessage = document.getElementById("inputMessage");
let chatPage = document.getElementById("chatPage");

let username;
let connected = true;
let bidding = false;
let lastTypingTime = '';
let currentInput = usernameInput.focus();

let socket = io();

addParticipantBidders = (data) => {
    let message = '';
    if (data.numUsers === 1) {
        message += "There's 1 bidder";
    } else {
        message += `there are ${data.numUsers} bidders`;
    }
    log(message);
}

setUsername = () => {
    username = cleanInput(username*nput.val().trim());

    if (username) {
        loginPage.fadeOut();
        chatPage.show();
        loginPage.off('click');
        currentInput = inputMessage.focus();

        socket.emit('add users', username);
    }
}

bid = (c) => {
    let now = moment().format("MM-DD-YYYY, h:mm:ss SSS a");
    let init_bid_condition = parseInt(c) == 00 ? 0 : parseInt(c);

    let init_bid_amt = parseInt('init-bid').text(10);
    let data_init_bid_amt = document.getElementById('init-bid').data('init-bid');
    let latest_bid_amt = parseInt('show:last-child').find('messageBody').text(10);
    let bid_amt_condition = data_init_bid_amt == 99 ? init_bid_amt : latest_bid_amt;

    let messag = init_bid_condition + bid_amt_condition + ' ['+now+']';
    let bid_sold_at = init_bid_condition + bid_amt_condition;
    init-bid.data(init-bid,0);
    message = cleanInput(message);
    
    if (message && connected) {
        inputMessage.val('');
        addBids({
            username: username,
            message: message,
            bid_sold_at : bid_sold_at
        });

        socket.emit('new message', { message, bid_sold_at });
    }
}

countdown = (data) => {
    let seconds = BIDDER_TIMER_LIMIT;
    let username = data ? data.username : 'error';
    let bidAmt = data ? data.bid_sold_at : 'error';

    tick = () => {
        let s = document.getElementById('time');
        seconds--;
        s.val(sconds).trigger("change");
        if (seconds > 0) {
            setTimeOut = setTimeout(function() {
                tick();
            }, 1000);
        } else {
            $('#container').html('<p class="text-center">Sold To '+username+' @ ' +bidAmt+ '</p>');
            $('.all-bid-logs').find('li:first-child').append('[ SOLD ]');
            $('.all-bid-logs').find('li:first-child').css({'background-color':'yellow', 'font-weight': 'bold'});
            $('.bid-btns').prop('disabled',true);
        }
    }
    tick();
}

socket.on('login', function (data) {
    connected = true;
    // Display the welcome message
    var message = "Welcome to Live Auction Demo MI – ";
    log(message, {
      prepend: true
    }); 
    addParticpantBidders(data);
    //setTimer();
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data) {
    addBids(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    log(data.username + ' joined');
    addParticpantBidders(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    log(data.username + ' left');
    addParticpantBidders(data);
    removingBiddingState(data);
  });

  // Whenever the server emits 'bidding', show the bidding message
  socket.on('bidding', function (data) {
    addBiddersBidding(data);
  });

  // Whenever the server emits 'stop bidding', kill the bidding message
  socket.on('stop bidding', function (data) {
    removingBiddingState(data);
  });

  socket.on('disconnect', function () {
    log('you have been disconnected');
  });

  socket.on('reconnect', function () {
    log('you have been reconnected');
    if (username) {
      socket.emit('add user', username);
    }
  });

  socket.on('reconnect_error', function () {
    log('attempt to reconnect has failed');
  });

  socket.on('strike initial bid price', function (bid_value) {
    strikeInitialBid(bid_value);
  });