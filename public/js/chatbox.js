// Chatroom setup
const chatForm = document.querySelector(".chat-form");
const chatMessages = document.querySelector(".chat-window");
const roomName = document.getElementById("room-name");
const chatterName = document.querySelector(".userName").textContent.trim();
const chatWindow = document.querySelector(".chatContainer");
const input = document.querySelector(".chat-input");

const socket = io();

const botName = 'Plug Bot';

function userLeave(id) {
  const index = users.findIndex(userName => userName.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Emit message to display to the chat window
  socket.emit('chatForm', input.value);
  input.value='';

});

socket.on('chatForm', message => {
  renderMessage(`${chatterName}:  ${message}`)
})

// Renders message for the chat window
const renderMessage = message => {
  const div = document.createElement('div')
  div.classList.add('render-message')
  div.innerText = message
  chatMessages.appendChild(div)
  console.log(chatMessages)
}
