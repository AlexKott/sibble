const slugUtil = require(`${__base}/utils/slugUtil`);

const newPost = {
    title: 'test post',
    dateCreated: '2000-01-02',
    content: 'Content for the test post',
};
const slug = slugUtil.generateSlug('test post', '2000-01-02');

const newPost2 = Object.assign({}, newPost,
    { title: 'updated test post' });

describe('PATCH /api/posts', () => {
    beforeEach((done) => {
        request.post('/api/posts')
            .send({ data: { attributes: newPost } })
            .end(() => {
                done();
            });
    });
    it('should return the updated post', (done) => {
        request.patch(`/api/posts/${slug}`)
            .send({ data: { attributes: newPost2 } })
            .expect(200)
            .end((err, data) => {
                assert.isNotNull(data, 'Api responses with data');
                assert.property(data.body, 'data', 'Api responses with a post');

                const attributes = data.body.data.attributes;
                assert.equal(attributes.title, newPost2.title, 'Api updates new properties');
                assert.equal(attributes.content,
                    newPost.content,
                    'Api keeps unchanged properties'
                );
                done();
            });
    });
});
