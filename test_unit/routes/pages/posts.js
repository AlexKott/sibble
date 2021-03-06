const slugUtil = require(`${__base}/utils/slugUtil`);

describe('GET posts', () => {
    const newPost = {
        title: 'a testing post',
        dateCreated: '2014-01-20',
        content: 'test',
    };
    const slug = slugUtil.generateSlug(newPost.title, newPost.dateCreated);
    const newPost2 = Object.assign({}, newPost,
        { title: 'the testing post for testing posts', content: 'test2' });

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
    it('should display a single post', (done) => {
        request.get(`/posts/${slug}`)
            .expect(200)
            .end((err, data) => {
                const startIndex = data.text.indexOf('<title>');
                const endIndex = data.text.indexOf('</title');
                const titleString = data.text.substring(startIndex, endIndex);
                assert.equal(data.status, 200, 'Api sends "ok"');
                assert.include(titleString, newPost.title, 'Api sends correct post');
                done();
            });
    });
});
