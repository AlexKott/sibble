const dateUtil = require(`${__base}/utils/dateUtil`);

const today = dateUtil.getToday();
const newPost = { title: 'test post one' };
const newPost2 = {
    dateCreated: '2016-01-10',
    title: 'test post two',
};
const newPost3 = {
    dateCreated: '2000-01-12',
    title: 'test post three',
};
const slug3 = 'test-post-three_2000-01-12';
const newPost4 = {
    title: 'test get post',
    dateCreated: '2014-01-20',
};

describe('POST /api/posts', () => {
    describe('date handling', () => {
        it('should set the current date if none is provided', (done) => {
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
            request.post('/api/posts')
                .send({ data: { attributes: newPost2 } })
                .expect(201)
                .end((err, data) => {
                    assert.equal(data.status, 201);
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
            request.post('/api/posts')
                .send({ data: { attributes: newPost3 } })
                .expect(201)
                .end((err, data) => {
                    assert.equal(data.body.data.id, slug3, 'Api calculates correct slug');
                    done();
                });
        });
    });
    describe('post validation', () => {
        before((done) => {
            request.post('/api/posts')
                .send({ data: { attributes: newPost4 } })
                .end(() => {
                    done();
                });
        });
        it('should refuse to save the same post twice', (done) => {
            request.post('/api/posts')
                .send({ data: { attributes: newPost4 } })
                .expect(409)
                .end((err, data) => {
                    assert.isNotNull(data, 'Api responses with data');
                    assert.equal(data.status, 409, 'Api sends correct error code');
                    assert.property(data.body.errors[0], 'detail', 'Api sends error details');
                    done();
                });
        });
        it('accepts invalid data formats', (done) => {
            const invalidData = { title: 'testing title', content: 'new content' };
            request.post('/api/posts')
                .send(invalidData)
                .expect(201)
                .end((err, data) => {
                    assert.equal(
                        data.body.data.attributes.title,
                        invalidData.title,
                        'Api accepts data that is not JSON API formatted'
                    );
                    done();
                });
        });
    });
});
