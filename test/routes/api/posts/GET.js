const assert = require('chai').assert;
const app = require(`${__base}/index`);
const request = require('supertest').agent(app.listen());

const newPost = {
    title: 'test get post',
    dateCreated: '2014-01-20',
};
const newPost2 = Object.assign({}, newPost,
    { title: 'test another get post' });

describe('GET /api/posts', () => {
    before((done) => {
        request.delete('/api/posts')
            .end(() => {
                request.post('/api/posts')
                    .send({ data: { attributes: newPost } })
                    .end(() => {
                        request.post('/api/posts')
                            .send({ data: { attributes: newPost2 } })
                            .end(() => {
                                done();
                            });
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
            });
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
    it('should return a 404 if a post is not found', (done) => {
        request.get('/api/posts/not-a-real-post')
            .expect(404)
            .end((err, data) => {
                assert.equal(data.status, 404);
                done();
            });
    });
    it('should return a link to self', (done) => {
        request.get('/api/posts/test-get-post_2014-01-20')
            .expect(200)
            .end((err, data) => {
                assert.property(data.body.data, 'links', 'Return data has link object');
                assert.property(data.body.data.links, 'self', 'Return data has link to self');
                assert.equal(
                    data.body.data.links.self,
                    '/posts/test-get-post_2014-01-20',
                    'Return data contains a link to the resource'
                );
                done();
            });
    });
});
