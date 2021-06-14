// Chatroom setup
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const username = document.getElementById('userName');

const socket = io();

socket.on('message', (data) => {
    document.getElementById('test').innerHTML = data;
})

const sendMessage = () => {
    socket.emit('message', "Hey")
}

