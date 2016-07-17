const dateUtil = require(`${__base}/utils/dateUtil`);

describe('dateUtil', () => {
    it('should transform single digits to double digit strings', () => {
        const n1 = 3;
        const n2 = 11;
        const n3 = -10;
        const n4 = -8;

        assert.equal(dateUtil.getDoubleDigitString(n1), '03');
        assert.equal(dateUtil.getDoubleDigitString(n2), '11');
        assert.equal(dateUtil.getDoubleDigitString(n3), '10');
        assert.equal(dateUtil.getDoubleDigitString(n4), '08');
    });
    it('should set the desired format for a given date', () => {
        const d1 = new Date('2000/12/07');
        const d2 = new Date('January 25 2015');
        const d3 = new Date('Dec 23 2017');

        assert.equal(dateUtil.formatDate(d1), '2000-12-07');
        assert.equal(dateUtil.formatDate(d2), '2015-01-25');
        assert.equal(dateUtil.formatDate(d3), '2017-12-23');
    });
});
