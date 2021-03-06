global.__base = __dirname;

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbsHelpers = require('./src/js/hbsHelpers');
const config = require('./config')(process.env.NODE_ENV);
const posts = require('./routes/api/posts');
const indexPage = require('./routes/pages/index');
const postsPage = require('./routes/pages/posts');
const adminPage = require('./routes/pages/admin');

if (config.env !== 'test') {
    app.use(morgan('dev'));
}

const hbs = exphbs.create({
    extname: '.hbs',
    layoutsDir: './src/hbs',
    partialsDir: './src/hbs/partials',
    defaultLayout: 'index',
    helpers: hbsHelpers,
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './src/hbs');

const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);

db.on('error', () => {
    console.error(`Could not connect to database ${config.dbUrl}`); // eslint-disable-line
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use('/api', posts);

app.get('*', (req, res, next) => {
    if (config.env === 'production' && req.get('X-Forwarded-Proto') === 'http') {
        return res.redirect(`https://${req.hostname}${req.originalUrl}`);
    }
    return next();
});

app.use(express.static('public'));

app.use('/', indexPage);
app.use('/posts', postsPage);
app.use('/admin', adminPage);

app.listen(config.port, () => {
    console.log(`Serving on port ${config.port} in ${config.env}`); // eslint-disable-line
});

module.exports = app;
