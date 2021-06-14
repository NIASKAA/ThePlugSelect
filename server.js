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

});

app.use(
   fileUpload({
      createParentPath: true,
   })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync({force: false}).then(() => {
    server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});