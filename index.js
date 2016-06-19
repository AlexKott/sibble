const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config')(process.env.NODE_ENV);
const posts = require('./routes/posts');

const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(config.dbUrl);

db.on('error', () => {
    console.error('Could not connect to database ' + config.dbUrl);
});
db.once('open', () => {
    console.log('Connected to database');
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use('/api', posts);

app.get('*', (req, res, next) => {
    if (config.env === 'production' && req.get('X-Forwarded-Proto') === 'http') {
        return res.redirect('https://' + req.hostname + req.originalUrl);
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Working!');
});

app.listen(config.port, () => {
    console.log(`Serving on port ${config.port} in ${config.env}`);
});
