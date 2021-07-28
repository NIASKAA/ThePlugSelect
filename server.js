const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const fileUpload = require("express-fileupload");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const io = socketio(server);

const sess = {
   secret: "wetheplugselect",
   cookie: {},
   resave: false,
   saveUninitialized: true,
   store: new SequelizeStore({
      db: sequelize,
   }),
};

app.use(session(sess));
const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("./public/"));
app.use(express.static("images"));
app.use(express.static("video"));
app.use(routes);

const rooms = [];

io.on("connection", (socket) => {
   console.log("User Connected: " + socket.id);

   socket.on("joinRoom", ({ username, room }) => {
      // add to the room array
      rooms.push(room);
      // emit the message to the client so it appears on the chat that the user joined
      io.to(room).emit("joinMessage", `${username} joined bidding ${room}`);
      console.log(`${username} joined ${room}`);
      socket.join(room);
   });

   // this is the function that allows for room-specific messages
   socket.on("chat", ({ message, room }) => {
      // the destructured object param containes information about the room that the message was sent in
      //this information is sent from the client in the
      io.to(room).emit("chat", message);
   });

   socket.on("bid", ({bid, room})=> {
      io.to(room).emit("bid", bid);
   })
   socket.on("disconnect", function () {
      socket.broadcast.emit("disconnected");
   });
   io.emit("userLeft", "User Disconnected");
});

app.use(
   fileUpload({
      createParentPath: true,
   })
);


sequelize.sync({ force: false }).then(() => {
   server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
