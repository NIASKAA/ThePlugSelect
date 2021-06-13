// Chatroom setup
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const username = document.getElementById('userName');

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username });

// Message from server
socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);

    // Scroll down through messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Get users
socket.on('roomUsers', ({ users}) => {
    outputUsers(users);
});

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    let msg = e.target.elements.msg.value;

    msg = msg.trim();

    if(!msg) {
        return false;
    }

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();    
});

// Output message to page
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerH
}

// socket.on('message', message => {
//     console.log(message);
// });

// let numUsers = 0;

// io.on('connection', socket => {
//     console.log('New WS Connection...');

//     let addedUser = false;

//     socket.emit('message', 'Welcome to our ChatBox!');

//     // Sets timer for buyers
//     socket.emit('currentEndTime', { time: timer.getEndTime() });

//     socket.on('setTimer', data => {
//         timer.setEndTime(data.time);
//         socket.broadcast.emit('currentEndTime', { time: time.getEndTime });
//     });

//     // When the chatroom emits a new message, this listens for the message, and executes it
//     socket.on('new message', data => {
//         socket.broadcast.emit('new message', {
//             username: socket.username,
//             message: data
//         });
//     });

//     // When the chatroom emits 'adding user', this listens for the action and executes it
//     socket.on('add user', username => {
//         if (addUser) return;

//         // This stores the username in the socket session for the chatroom
//         socket.username = username;
//         ++numUsers;
//         addedUser = true;
//         socket.emit('login', {
//             numUsers: numUsers
//         });
//     });

//     // When the chatroom emits 'typing', this will broadcast to other users
//     socket.on('typing', () => {
//         socket.boradcast.emit(`${username} is typing`, {
//             username: socket.username
//         });
//     });

//     // When the chatroom emits 'stopped typing', this will broadcast to other users
//     socket.on('stopped typing', () => {
//         socket.broadcast.emti(`${username} has stopped typing`, {
//             username: socket.username
//         });
//     });
    
//     // When a user disconnect from the chatroom, this action will perform
//     socket.on('disconnect', () => {
//         if (addedUser) {
//             --numUsers;

//             // This will globally display the user has left
//             socket.boradcast.emi(`${username} has left the chatroom`, {
//                 username: socket.username,
//                 numUsers: numUsers
//             });
//         }
//     });
// });