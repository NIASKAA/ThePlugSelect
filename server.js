const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const fileUpload = require("express-fileupload");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const {
    userJoin,
    getCurrentUser,
    userLeave
} = require('./utils/users');

// Timer for auction dependencies
// Timer = require('./public/js/timer').Timer,
// timer = new Timer();

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const { emit } = require('process');

const PORT = process.env.port || 3001;

const io = socketio(server);

const sess = {
    secret: 'wetheplugselect',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static('./public/'));
app.use(express.static("images"));
app.use(express.static("video"));
app.use(routes);

const numUsers = 0;

const botName = 'BidRoom Bot';

io.on('connection', socket => {
    // const addedUser = false;
    // io.emit('message', '');
    // console.log('User Connected: ' + socket.id);

    socket.on('chatForm', message => {
        console.log('From server: ', message)

        io.emit('chatForm', message)
    })

    // socket.on("joinRoom", ({ username, room }) => {
    //     // add to the room array
    //     rooms.push(room);
    //     // emit the message to the client so it appears on the chat that the user joined
    //     socket.broadcast.emit("message", `${username} joined ${room}`);
    //     console.log(`${username} joined ${room}`);
    //     socket.join(room);
    //  });
  
    //  // this is the function that allows for room-specific messages
    //  socket.on("chat", ({ message, room }) => {
    //     // the destructured object param containes information about the room that the message was sent in
    //     //this information is sent from the client in the
    //     io.to(room).emit("chat", message);
    //  });
    //  socket.on("disconnect", function () {
    //     socket.broadcast.emit("disconnected");
    //  });
    //  io.emit("userLeft", "User Disconnected");
});

app.use(
   fileUpload({
      createParentPath: true,
   })
);

sequelize.sync({force: false}).then(() => {
    server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});