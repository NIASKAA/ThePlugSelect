const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.port || 3001;

const sess = {

}

app.use(session(sess));
const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlendcoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});