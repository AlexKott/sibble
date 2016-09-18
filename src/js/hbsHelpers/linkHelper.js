const tagBuilder = require(`${__base}/utils/tagBuilder`);

module.exports = function linkHelper(opts) {
    const options = {
        tagName: 'a',
        innerHTML: opts.fn(),
        href: opts.hash.href,
        className: opts.hash.className,
        cssId: opts.hash.cssId,
        data: {
            target: opts.hash.target,
        },
        trimWhitespace: true,
    };
    return tagBuilder(options);
};
