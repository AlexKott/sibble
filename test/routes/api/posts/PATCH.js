process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const app = require(`${__base}/index`);
const request = require('supertest').agent(app.listen());
const slugUtil = require(`${__base}/utils/slugUtil`);

const beforePost = {
    title: 'test post',
    dateCreated: '2000-01-02',
    content: 'Content for the test post',
};
const slug = slugUtil.generateSlug('test post', '2000-01-02');

describe('PATCH /api/posts', () => {
    beforeEach((done) => {
        request.post('/api/posts')
            .send({ data: { attributes: beforePost } })
            .end(() => {
                done();
            });
    });
    it('should return the updated post', (done) => {
        const newPost = {
            title: 'updated test post',
            dateCreated: beforePost.dateCreated,
            content: beforePost.content,
        };
        request.patch(`/api/posts/${slug}`)
            .send({ data: { attributes: newPost } })
            .expect(200)
            .end((err, data) => {
                assert.isNotNull(data, 'Api responses with data');
                assert.property(data.body, 'data', 'Api responses with a post');

                const attributes = data.body.data.attributes;
                assert.equal(attributes.title, newPost.title, 'Api updates new properties');
                assert.equal(attributes.content,
                    beforePost.content,
                    'Api keeps unchanged properties'
                );
                done();
            });
    });
});
