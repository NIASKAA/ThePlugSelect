$(function() {
    let FADE_TIME = 200;
    const TYPING_TIMER_LENGTH = 400;

    const $window = $(window);
    let $usernameInput = $('.usernameInput');
    let $messages = $('.messages');
    let $inputMessage = $('.inputMessage');

    let $chatPage = $('.chat.page');

    let connected = false;
    let typing = false;
    let lastTypingTime;
    let $currentInput = $usernameInput.focus();

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
        username = cleanInput($usernameInput.val().trim());

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
    function addChattMessage (data, options) {
        let $typingMssages = getTypingMessages(data);
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
})