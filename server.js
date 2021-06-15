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

// Timer for auction dependencies
Timer = require('./public/js/timer').Timer,
timer = new Timer();

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

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

io.on('connection', socket => {
    const addedUser = false;
    io.emit('message', '');
    console.log('User Connected: ' + socket.id);
    
    socket.on('message', (data) => {
        console.log("From client: " , data);
        socket.broadcast.emit('message', data);
    });

    socket.on('chat', message => {
        io.emit('chat', message)
    })

    
    io.emit('userLeft', "User Disconnected");
    
});

app.use(
   fileUpload({
      createParentPath: true,
   })
);

sequelize.sync({force: false}).then(() => {
    server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});