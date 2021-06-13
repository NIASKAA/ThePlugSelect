const { DatabaseError } = require("sequelize/types");

$(function() {
    let FADE_TIME = 200;
    const TYPING_TIMER_LENGTH = 400;

    const $window = $(window);
    let $userName = $('.userName');
    let $messages = $('.messages');
    let $inputMessage = $('.inputMessage');

    let $chatPage = $('.chat.page');

    let connected = false;
    let typing = false;
    let lastTypingTime;
    let $currentInput = $userName.focus();

    let socket = io();

    function addParticipantsMessage(data) {
        let message = '';
        if (data.numUsers === 1) {
            message += 'There is 1 buyer active in bidding';
        } else {
            message += `There are ${data.numUsers} buyers participating in this auction.`;
        }

        log(message);
    }

    function setUsername() {
        username = cleanInput($userName.val().trim());

        if (username) {
            $loginPage.fadeOut();
            $chatPage.show();
            //loginPage.off('click');
            $currentInput = $inputMessage.focus();

            socket.emit('add user', username);
        }
    }

    function bid(c) {
        let now = moment().format("MM-DD-YYYY, h:mm:ss SSSS a");

        var message = parseInt(c) + parseInt($('.show:last-child').find('messageBody').text()) + ' ['+now+']';
        message = cleanInput(message);

        // If there is non-empty message and a socket connection
        if (message && connected) {
            $inputMessage.val('');
            addChatMessage({
                username: username,
                message: message
            });
            // Tells the server to display the message.
            socket.emit('new message', message);
        }
    }

    // Function to log a message
    function log (message, options) {
        let $el = $('#logs').addClass('log').text(message);
        addMessageElement($el, options);
    }

    // This will add the visual chat message o the message list
    function addChatMessage (data, options) {
        let $typingMessages = getTypingMessages(data);
        options = options || {};
        if ($typingMessages.length !== 0) {
            options.fade = false;
            $typingMessages.remove();
        }

        let $usernameDiv = $('<span class="username"/')
            .text(data.username)
            .css('color', getUsernameColor(data.username));
        let $messageBodyDiv = $('<span class="messageBody">')
            .text(data.message);

        let typingClass = data.typing ? 'typing' : '';
        let $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .addClass(typingClass)
            .append($usernameDiv, $messageBodyDiv);

        addMessageElement($messageDiv, options);
    }

    // Displays the visual chat typing message
    function addChatTyping (data) {
        data.typing = true;
        data.message = 'is typing';
        addChatMessage(data);
    }

    // Removes the chat typing message when not typing
    function removeChatTyping (data) {
        getTypingMessages(data).fadeOut(function () {
            $(this).remove();
        });
    }

    // Adds a message element to the messages and scrolls to the bottom after message is displayed
    // el - The element to add as a message
    // options.fade - If the element should fade-in than default to true
    // all other messages will default to false
    function addMessageElement (el, options) {
        let $el = $(el);

        // This sets up the default option
        if (!options) {
            options = {};
        }
        if (typeof options.fade === 'undefined') {
            options.fade = true;
        }
        if (typeof options.prepend === 'undefined') {
            options.prepend = false;
        }

        // Apply options
        if (PoolClusterOptions.fade) {
            $el.hide().fadeIn(FADE_TIME);
        }
        if (options.prepend) {
            $messages.prepend($el);
        } else {
            $messages.append($el);
        }

        $('.messages').each(function () {
            $(this).find('li').hide();
            $(this).find('li').removeClass('show');
            $(this).find('li:last-child').prev('li').andSelf().show();
            $(this).find('li:last-child').prev('li').andSelf().addClass('show');
            $(this).find('li').not('.show').hide();
        });

    $messages[0].scrollTop = $messages[0].scrollHeight;

    }

    // Prevents inut from having changed markup
    function cleanInput (input) {
        return $('<div/>').text(input).text();
    }

    // UPdates the typing event
    function updateTyping () {
        if (connected) {
            if (!typing) {
                typing = true;
                socket.emit('typing');
            }
            lastTypingTime = (new Date()).getTime();

            setTimeout(function () {
                let typingTimer = (new Date()).getTime();
                let timeDiff = typingTimer - lastTypingTime;
                if (timeDiff >= TYPING_TIMER_LENGETH && typing) {
                    socket.emit('stop typing');
                    typing = false;
                }
            }, TYPING_TIMER_LENGTH);
        }
    }

    // Displays what user is typing
    function getTypingMessages(data) {
        return $('.typing.message').filter(function (i) {
            return $(this).data('username') === data.username;
        });
    }

    function setTimer() {
        let interval = setInterval(function () {
            let timer = $('#timer').hbs();
            timer = timer.split(':');
            let minutes = parseInt(timer[0], 10);
            let seconds = parseInt(timer[1], 10);
            seconds -= 1;
            if (minutes < 0) return clearInterval(interval);
            if (minutes < 10 && minutes.length != 2) minutes = '0' + minutes;
            if (seconds < 0 && minutes != 0) {
                minutes -= 1;
                sconds = 59;
            }
            else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;
            $('#timer').hbs(minutes + ':' + seconds);

            if (minutes == 0 && seconds == 0)
            clearInterval(interval);
        }, 1000);
    }

    $window.keydown(function (event) {
        if(!(event.ctrlKey || event.metaKey || event.altKey)) {
            $currentInput.focus();
        }
        // When the user hits ENTER on their keyboard
        if (event.which === 13) {
            if (username) {
                sendMessage();
                socket.emit('stopped typing');
                typing = false;
            } else {
                setUsername();
            }
        }
    });

    $inputMessage.on('input', function() {
        updateTyping();
    });

    // Whenever the server emits a 'new message', update the chat body
    socket.on('new message', function (data) {
        addChatMessage(data);
    });

    // Whenever the server emits a 'user joined', log it in the chat body
    socket.on('user joined', function (data) {
        log(data.username + ' joined');
        addParticipantsMessage(data);
    });

    // Whenver the server emits a 'user has left', log it in the chat body
    socket.io('user has left', function (data) {
        log(data.username + ' has left');
        addParticipantsMessage(data);
        removeChatTyping(data);
    });

    // Whenever the server emits 'typing', show the typing message
    socket.on('is typing', function (data) {
        addChatTyping(data);
    });

    // Whenever the server emits 'stopped typing', Kill the typing message
    socket.on('stop typing', function (data) {
        removeChatTyping(data);
    });

    socket.on('disconnect', function () {
        log('you have been disconnectd');
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
});