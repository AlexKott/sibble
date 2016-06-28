global.__base = __dirname;

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const config = require('./config')(process.env.NODE_ENV);
const posts = require('./routes/api/posts');
const pages = require('./routes/pages/index');

const mongoose = require('mongoose');
const db = mongoose.connection;

const hbs = exphbs.create({
    extname: '.hbs',
    layoutsDir: './src/hbs',
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './src/hbs');

mongoose.connect(config.dbUrl);

db.on('error', () => {
    console.error(`Could not connect to database ${config.dbUrl}`); // eslint-disable-line
});

if (config.env !== 'test') {
    app.use(morgan('dev'));
}

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

app.use('/', pages);

app.get('/', (req, res) => {
    res.send('Working!');
});

app.listen(config.port, () => {
    console.log(`Serving on port ${config.port} in ${config.env}`); // eslint-disable-line
});

module.exports = app;
