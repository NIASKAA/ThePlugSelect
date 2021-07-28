// Chatroom setup
const chatForm = document.querySelector(".chat-form");
const chatMessages = document.querySelector(".chat-window");
const roomName = document.getElementById("room-name");
const chatterName = document.querySelector(".userName").textContent.trim();
const chatWindow = document.querySelector(".chatContainer");
const input = document.querySelector(".chat-input");

const socket = io();
item_id = document.location.href.split("/")[4];
// keeping it simple, room id is  room + item id
let room = `room${item_id}`;


// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let time = new Date().toLocaleTimeString();
  if(input.value.length <= 0 ) return;
  // Emit message to display to the chat window
  socket.emit('chat', {message: `${chatterName} says: ${input.value} == ${time}`, room: room}, );
  input.value='';

});

socket.on('chat', message => {
  renderMessage(message)
})

// Renders message for the chat window
const renderMessage = message => {
  const div = document.createElement('div')
  div.classList.add('render-message')
  div.innerText = message
  chatMessages.appendChild(div)
  console.log(chatMessages)
}

// This was created by Santos see if I can get to work
// emit a joinroom event from to the server with the specific room that was joined
socket.emit("joinRoom", { username: chatterName, room: room });
socket.on("joinMessage", (data) => {
   document.getElementById("user-joined-div").innerHTML = data;
});

socket.on("bid", (bid)=> {
  renderMessage(bid);
})


