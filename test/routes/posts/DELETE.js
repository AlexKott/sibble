process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const app = require('../../../index');
const request = require('supertest').agent(app.listen());
const slugUtil = require('../../../utils/slugUtil');

const beforePost = {
    title: 'test post',
    dateCreated: '2000-01-02',
    content: 'Content for the test post',
};
const slug = slugUtil.generateSlug('test post', '2000-01-02');

describe('DELETE /api/posts', () => {
    beforeEach((done) => {
        request.post('/api/posts')
            .send({ data: { attributes: beforePost } })
            .end(() => {
                const post2 = beforePost;
                post2.title = 'test post 2';
                request.post('/api/posts')
                    .send({ data: { attributes: post2 } }, done)
                    .end(() => {
                        done();
                    });
            });
    });
    it('should delete the post', (done) => {
        request.delete(`/api/posts/${slug}`)
            .expect(204)
            .end((err1, data1) => {
                assert.equal(data1.status, 204, 'Api deletes post');
                request.get(`/api/posts/${slug}`)
                    .expect(404)
                    .end((err2, data2) => {
                        assert.equal(data2.status, 404, 'Api does not find removed post');
                        assert.lengthOf(Object.keys(data2.body), 0, 'Api returns empty body');
                        done();
                    });
            });
    });
    it('should not return any posts after a delete on all', (done) => {
        request.post('/api/posts')
            .send({ data: { attributes: beforePost } })
            .expect(201)
            .end(() => {
                const post3 = beforePost;
                post3.title = 'test post 3';
                request.post('/api/posts')
                    .send({ data: { attributes: post3 } })
                    .expect(201)
                    .end(() => {
                        request.delete('/api/posts')
                            .expect(204)
                            .end((err1, data1) => {
                                assert.equal(data1.status, 204);
                                request.get('/api/posts')
                                    .expect(204)
                                    .end((err2, data2) => {
                                        assert.equal(data2.status, 204, 'Api returns empty body');
                                        done();
                                    });
                            });
                    });
            });
    });
});
