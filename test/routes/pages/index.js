const assert = require('chai').assert;
const app = require(`${__base}/index`);
const request = require('supertest').agent(app.listen());

describe('GET index', () => {
    const newPost = {
        title: 'test get post',
        dateCreated: '2014-01-20',
    };
    const newPost2 = Object.assign({}, newPost,
        { title: 'test another get post' });

    before((done) => {
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
    it('should deliver a html page', (done) => {
        request.get('/')
            .expect(200)
            .end((err, data) => {
                assert.equal(data.status, 200);
                assert.equal(data.type, 'text/html');
                assert.include(data.text, '<!DOCTYPE html>');
                done();
            });
    });
});
