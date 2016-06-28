const assert = require('chai').assert;
const app = require(`${__base}/index`);
const request = require('supertest').agent(app.listen());

describe('GET index', () => {
    const newPost = {
        title: 'test get post',
        dateCreated: '2014-01-20',
    };
    before((done) => {
        request.post('/api/posts')
            .send({ data: { attributes: newPost } })
            .end(() => {
                const newPost2 = newPost;
                newPost2.title = 'test another get post';
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
                assert.equal(data.type, 'text/html');
                assert.include(data.text, '<!DOCTYPE html>');
                done();
            });
    });
});
