// Chatroom setup
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const username = document.querySelector('.userName').textContent.trim();
const chatWindow = document.querySelector('.chatContainer')

const socket = io();

const renderMessage = message => {
    const div = document.createElement('div')
    div.classList.add('render-message')
    div.innerText = message

    chatWindow.appendChild(div)
  }
  
function setTimer(num) {
  var counter = setInterval(function () {
      document.getElementById('timer').innerHTML = num;
      num-- || clearInterval(counter);
  }, 1000);
}
setTimer(10);

function bidSold(data){
  document.getElementById('test').innerHTML = data;
  alert(`$${username} Won the bid!`)
};

setTimeout(bidSold, 12000);

socket.on('message', (data) => {
    document.getElementById('test').innerHTML = data;
    socket.emit('message', `${username} joined the chat`)

})

const sendMessage = () => {
    socket.emit('message', "Hey")
}

socket.on('chat', message => {
  console.log(`${username} ${message}`)
})

socket.on('disconnect', message => {
  socket.emit('message', `\n\n\n\n${username} disconnected\n\n\n\n\n`);
})

socket.on('chat', message => {
    renderMessage(message)
})
  

socket.on('userLeft', () => {
  
})
