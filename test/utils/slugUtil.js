const assert = require('chai').assert;
const slugUtil = require(`${__base}/utils/slugUtil`);

describe('slugUtil', () => {
    it('should slugify a given title', () => {
        const title1 = 'test title';
        const slugTitle1 = 'test-title';
        const title2 = 'täst tòıtal asd';
        const slugTitle2 = 'tast-toital-asd';

        assert.equal(slugUtil.slugifyTitle(title1), slugTitle1);
        assert.equal(slugUtil.slugifyTitle(title2), slugTitle2);
    });
    it('should create a slug from a title and a date', () => {
        const title = 'test title asd';
        const date = '2000-01-20';
        const slug = 'test-title-asd_2000-01-20';

        assert.equal(slugUtil.generateSlug(title, date), slug);
    });
    it('should lowercase the slug', () => {
        const title = 'TesT TITLE thrEE';
        const date = '2000-03-10';
        const slug = 'test-title-three_2000-03-10';

        assert.equal(slugUtil.generateSlug(title, date), slug);
    });
});
