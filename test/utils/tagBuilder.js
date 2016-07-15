const assert = require('chai').assert;
const tagBuilder = require(`${__base}/utils/tagBuilder`);

describe('tag builder', () => {
    it('should create the correct html tag', () => {
        const options = {
            tagName: 'div',
        };
        const markup = tagBuilder(options);
        assert.equal(markup, '<div></div>');
    });
    it('should insert the right innerHTML', () => {
        const options = {
            tagName: 'div',
            innerHTML: '<span>Test</span>',
        };
        const markup = tagBuilder(options);
        assert.equal(markup, '<div><span>Test</span></div>');
    });
    it('should add the correct css class', () => {
        const options = {
            tagName: 'div',
            className: 'testing-class',
        };
        const markup = tagBuilder(options);
        assert.equal(markup, '<div class="testing-class"></div>');
    });
    it('should add the correct href if element is a link', () => {
        const options = {
            tagName: 'a',
            innerHTML: 'link',
            href: 'url',
        };
        const markup = tagBuilder(options);
        assert.equal(markup, '<a href="url">link</a>');
    });
});
