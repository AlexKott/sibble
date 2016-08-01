const tagBuilder = require(`${__base}/utils/tagBuilder`);

module.exports = function linkHelper(opts) {
    const options = {
        tagName: 'a',
        innerHTML: opts.fn(),
        href: opts.hash.href,
        className: opts.hash.className,
        data: {
            target: opts.hash.target,
        },
    };
    return tagBuilder(options);
};
