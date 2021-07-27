// Chatroom setup
const chatForm = document.querySelector(".chat-form");
const chatMessages = document.querySelector(".chat-window");
const roomName = document.getElementById("room-name");
const userName = document.querySelector(".userName").textContent.trim();
const chatWindow = document.querySelector(".chatContainer");
const input = document.querySelector(".chat-input");

const socket = io();

// const renderMessage = (message) => {
//   const div = document.createElement("div");
//   div.classList.add("render-message");
//   div.innerText = message;

//   chatWindow.appendChild(div);
// };
// //socket.connect(`localhost:3000/bid/chat/${item_id}`);

// socket.on("connection", )
// socket.on("message", (data) => {
//   document.getElementById("test").innerHTML = data;
//   message =
//     username.length > 0
//       ? `${username} joined the chat`
//       : "Unregistered user joined the chat";
//   socket.emit("message", message);
// });

// const sendMessage = () => {
//   socket.emit("message", "Hey");
// };

// socket.on("chat", (message) => {
//   console.log(`${username} ${message}`);
// });

// socket.on("disconnect", (message) => {
//   socket.emit("message", `\n\n\n\n${username} disconnected\n\n\n\n\n`);
// });

// socket.on("chat", (message) => {
//   renderMessage(message);
// });

// socket.on("userLeft", () => {
//     socket.emit('message', "Hey")
// })

// Message from server
// socket.on('message', (message) => {
//   console.log(message)

//   // Scroll down
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });

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

  // Emit message to server
  socket.emit('chatForm', input.value);
  input.value='';

});

socket.on('chatForm', message => {
  renderMessage(`${userName}:  ${message}`)
})

// Outputs message to the chat window
const renderMessage = message => {
  const div = document.createElement('div')
  div.classList.add('render-message')
  div.innerText = message
  chatMessages.appendChild(div)
  console.log(chatMessages)
}



// // Add users to DOM
// function outputUsers(users) {
//   userList.innerHTML = '';
//   users.forEach((user) => {
//     const li = document.createElement('li');
//     li.innerText = user.username;
//     userList.appendChild(li);
//   });
// }