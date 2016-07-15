const assert = require('chai').assert;
const app = require(`${__base}/index`);
const request = require('supertest').agent(app.listen());
const slugUtil = require(`${__base}/utils/slugUtil`);

const newPost = {
    title: 'test post',
    dateCreated: '2000-01-02',
    content: 'Content for the test post',
};
const slug = slugUtil.generateSlug('test post', '2000-01-02');

const newPost2 = Object.assign({}, newPost,
    { title: 'test post 2' });
const newPost3 = Object.assign({}, newPost,
    { title: 'test post 3' });

describe('DELETE /api/posts', () => {
    beforeEach((done) => {
        request.post('/api/posts')
            .send({ data: { attributes: newPost } })
            .end(() => {
                request.post('/api/posts')
                    .send({ data: { attributes: newPost2 } }, done)
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
                        done();
                    });
            });
    });
    it('should not return any posts after a delete on all', (done) => {
        request.post('/api/posts')
            .send({ data: { attributes: newPost } })
            .expect(201)
            .end(() => {
                request.post('/api/posts')
                    .send({ data: { attributes: newPost3 } })
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
