process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const app = require('../../index');
const request = require('supertest').agent(app.listen());
const dateUtil = require('../../utils/dateUtil');


describe('GET /api/posts', () => {
    before((done) => {
        request.post('/api/posts')
            .send({ data: { attributes: { title: 'test get post', dateCreated: '2014-01-20' }}})
            .end((err, data) => {
                request.post('/api/posts')
                    .send({ data: { attributes: { title: 'test another get post' }}})
                    .end((err, data) => {
                        done();
                    });
            });
    });
    it('should return a list with all posts', (done) => {
        request.get('/api/posts')
            .expect(200)
            .end((err, data) => {
                assert.isArray(data.body.data, 'Api returns data as array');
                assert.lengthOf(
                    data.body.data,
                    2,
                    'Api returns correct amount of datasets'
                );
                done();
            })
    });
    it('should return a single post by slug', (done) => {
        request.get('/api/posts/test-get-post_2014-01-20')
            .expect(200)
            .end((err, data) => {
                assert.propertyVal(
                    data.body.data.attributes,
                    'title',
                    'test get post',
                    'Get the correct post from the api'
                );
                done();
            });
    });
    it('should not return the auto generated _id', (done) => {
        request.get('/api/posts/test-get-post_2014-01-20')
            .expect(200)
            .end((err, data) => {
                assert.notProperty(data.body, '_id', 'Api removes auto _id');
                done();
            });
    });
});

describe('POST /api/posts', () => {
    describe('date handling', () => {
        it('should set the current date if none is provided', (done) => {
            const today = dateUtil.getToday();
            const newPost = { data: { attributes: { title: 'test post one' }}};

            request.post('/api/posts')
                .send(newPost)
                .expect(201)
                .end((err, data) => {
                    assert.equal(
                        data.body.data.attributes.dateCreated,
                        today,
                        'Api sets date to today'
                    );
                    done();
                });
        });
        it('should use the posted date', (done) => {
            const newPost = { data: {
                attributes: {
                    dateCreated: '2016-01-10',
                    title: 'test post two'
            }}};

            request.post('/api/posts')
                .send(newPost)
                .expect(201)
                .end((err, data) => {
                    assert.equal(
                        data.body.data.attributes.dateCreated,
                        '2016-01-10',
                        'Api uses posted date'
                    );
                    done();
                });
        });
    });
    describe('generating slugs', () => {
        it('should create a new slug for posts', (done) => {
            const newPost = { data: {
                attributes: {
                    dateCreated: '2000-01-12',
                    title: 'test post three'
            }}};
            const slug = 'test-post-three_2000-01-12';

            request.post('/api/posts')
                .send(newPost)
                .expect(201)
                .end((err, data) => {
                    assert.equal(data.body.data.id, slug, 'Api calculates correct slug');
                    done();
                });
        });
    });
    describe('post validation', () => {
        const newPost = { data: { attributes: { title: 'test get post', dateCreated: '2014-01-20' }}};
        before((done) => {
            request.post('/api/posts')
                .send(newPost)
                .end((err, data) => {
                    done();
                });
        });
        it('should refuse to save the same post twice', (done) => {

            request.post('/api/posts')
                .send(newPost)
                .expect(409)
                .end((err, data) => {
                    assert.isNotNull(data, 'Api responses with data');
                    assert.equal(data.status, 409, 'Api sends correct error code');
                    assert.property(data.body.errors[0], 'detail', 'Api sends error details');
                    done();
                });
        });
    });
});
