const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const http = require('http');
const Handlebars = require('handlebars');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Timer for auction dependencies
Timer = require('./public/js/timer').Timer,
timer = new Timer();

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const io = socketio(server);

const PORT = process.env.port || 3001;

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

const botName = "Plug Bot";


io.on('connection', socket => {
    console.log('New WS Connection...');

//     socket.on('joinRoom', ({ username, bidRoom }) => {
//         const user = userJoin(socket.id, username, bidRoom)

//         socket.join(user.bidRoom);

//         // Welcome message to user
//         socket.emit('message', 'Welcome to The Plug Select');

//         // Broadcast when a user connects
//         socket.broadcast.to(user.bidRoom).emit(
//             'message', 
//             formatMessage(botName, `${user.username} has joined the chat`)
//         );

//         // Sends users to room
//         io.to(user.bidRoom).emit('roomUsers', {
//             room: userbidRoom,
//             users: getRoomUsers(user.bidRoom)
//         });
//     });

//     // Runs when client disconnects
//     socket.on('disconnect', () => {
//         const user = userLeave(socket.id);

//         if (user) {
//             io.to(user.bidRoom).emit(
//                 'message',
//                 formatMessage(botName, `${user.username} has left the chat`)
//             );
//         }
//     });

//     Listen for chatMessage
//     socket.on('chatMessage', msg => {
//         const user = getCurrentUser(socket.id);

//         io.to(user.bidRoom).emit('message', formatMessage(user.username,msg));
//     });
// });
// app.use(
//    fileUpload({
//       createParentPath: true,
//    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync({force: false}).then(() => {
    server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});