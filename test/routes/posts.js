process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const app = require('../../index');
const request = require('supertest').agent(app.listen());
const dateUtil = require('../../utils/dateUtil');


describe('GET /api/posts', () => {
    it('should return 200', (done) => {
        request.get('/api/posts')
            .expect(200, done);
    });
});

describe('POST /api/posts', () => {
    describe('date handling', () => {
        it('should set the current date if none is provided', (done) => {
            const today = dateUtil.getToday();
            const newPost = { data: { attributes: { title: 'test post' }}};

            request.post('/api/posts')
                .send(newPost)
                .expect(201)
                .end((err, data) => {
                    assert.equal(data.body.data.attributes.dateCreated, today);
                    done();
                });
        });
        it('should use the posted date', (done) => {
            const newPost = { data: {
                attributes: {
                    dateCreated: '2016-01-10',
                    title: 'test post'
            }}};

            request.post('/api/posts')
                .send(newPost)
                .expect(201)
                .end((err, data) => {
                    assert.equal(data.body.data.attributes.dateCreated, '2016-01-10');
                    done();
                });
        });
    });
});
