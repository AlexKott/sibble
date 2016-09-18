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
    it('should add all provided data attributes to the element', () => {
        const options = {
            tagName: 'div',
            data: {
                target: 'internal',
                test: 'testing',
            },
        };
        const markup = tagBuilder(options);
        assert.equal(markup, '<div data-target="internal" data-test="testing"></div>');
    });
    it('should trim whitespace if wanted', () => {
        const options = {
            tagName: 'span',
            innerHTML: '   testing whitespace    ',
            trimWhitespace: true,
        };
        const markup = tagBuilder(options);
        assert.equal(markup, '<span>testing whitespace</span>');
    });
});
