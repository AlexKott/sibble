const jsonApi = require(`${__base}/utils/jsonApi`);

describe('JSON API util', () => {
    it('should build a valid data and attribute wrapper', () => {
        const invalidData1 = { title: 'test title1', content: 'no content' };
        const jsonApiData1 = jsonApi.build(invalidData1);
        const invalidData2 = { data: { title: 'test title' } };
        const jsonApiData2 = jsonApi.build(invalidData2);
        assert.deepEqual(jsonApiData1, { data: { attributes: invalidData1 } });
        assert.deepEqual(jsonApiData2, { data: { attributes: invalidData2.data } });
    });
    it('should return a promise for validation', () => {
        const validation = jsonApi.validate({ test: 'test' });
        assert.property(validation, 'then');
    });
});
