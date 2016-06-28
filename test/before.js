global.__base = `${__dirname}/../`;
process.env.NODE_ENV = 'test';

const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('mongodb');

const connect = require('mongodb').connect;

before((done) => {
    connect('mongodb://localhost/alexkott-test', (err, db) => {
        databaseCleaner.clean(db, () => {
            db.close();
            done();
        });
    });
});
