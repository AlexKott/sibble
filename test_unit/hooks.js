global.__base = `${__dirname}/../`;
process.env.NODE_ENV = 'test';

const mongodb = require('mongodb');
const app = require(`${__base}/index`);
const server = app.listen();
global.request = require('supertest').agent(server);
global.assert = require('chai').assert;

before((done) => {
    mongodb.connect('mongodb://localhost/sibble-test', (err, db) => {
        db.dropDatabase();
        done();
    });
});

after(() => {
    server.close();
});
