process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const app = require(`${__base}/index`);
const request = require('supertest').agent(app.listen());
const dateUtil = require(`${__base}/utils/dateUtil`);

describe('POST /api/posts', () => {
    describe('date handling', () => {
        it('should set the current date if none is provided', (done) => {
            const today = dateUtil.getToday();
            const newPost = { title: 'test post one' };

            request.post('/api/posts')
                .send({ data: { attributes: newPost } })
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
            const newPost = {
                dateCreated: '2016-01-10',
                title: 'test post two',
            };

            request.post('/api/posts')
                .send({ data: { attributes: newPost } })
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
            const newPost = {
                dateCreated: '2000-01-12',
                title: 'test post three',
            };
            const slug = 'test-post-three_2000-01-12';

            request.post('/api/posts')
                .send({ data: { attributes: newPost } })
                .expect(201)
                .end((err, data) => {
                    assert.equal(data.body.data.id, slug, 'Api calculates correct slug');
                    done();
                });
        });
    });
    describe('post validation', () => {
        const newPost = {
            title: 'test get post',
            dateCreated: '2014-01-20',
        };
        before((done) => {
            request.post('/api/posts')
                .send({ data: { attributes: newPost } })
                .end(() => {
                    done();
                });
        });
        it('should refuse to save the same post twice', (done) => {
            request.post('/api/posts')
                .send({ data: { attributes: newPost } })
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
