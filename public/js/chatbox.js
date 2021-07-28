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
  if(input.value.length <= 0 ) return;
  // Emit message to display to the chat window
  socket.emit('chat', {message: input.value, room: room}, );
  input.value='';

});

socket.on('chat', message => {
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

// This was created by Santos see if I can get to work
// emit a joinroom event from to the server with the specific room that was joined
socket.emit("joinRoom", { username: chatterName, room: room });
socket.on("joinMessage", (data) => {
   document.getElementById("user-joined-div").innerHTML = data;
   message =
      chatterName.length > 0
         ? `${username} joined the chat`
         : "Unregistered user joined the chat";
   socket.emit("message", message);
});

socket.on("bid", (bid)=> {
  renderMessage(bid);
})

// socket.on("chat", (message) => {
//    console.log(`${username} ${message}`);
// });

// socket.on("disconnect", (message) => {
//    socket.emit("message", `\n\n\n\n${username} disconnected\n\n\n\n\n`);
// });

// socket.on("chat", (message) => {
//    renderMessage(message);
// });

// socket.on("userLeft", () => {
//    socket.emit("message", "Hey");
// });
