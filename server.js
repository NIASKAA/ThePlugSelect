const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
let app = express();
let server = require('http').createServer(app)
const io = require('socket.io')(server);
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Timer for auction dependencies
Timer = require('./public/js/timer').Timer,
timer = new Timer();

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

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
app.use(express.static("public"));
app.use(express.static("images"));
app.use(routes);

sequelize.sync({force: false}).then(() => {
    server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});