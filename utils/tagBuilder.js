require('babel-polyfill');
const document = require('html-element').document;

module.exports = function tagBuilder(options) {
    const element = document.createElement(options.tagName);
    element.innerHTML = options.trimWhitespace ? options.innerHTML.trim() : options.innerHTML;
    element.class = options.className;
    element.id = options.cssId;

    if (options.tagName === 'a') {
        element.href = options.href;
    }
    if (Object.hasOwnProperty.call(options, 'data')) {
        for (const [key, value] of Object.entries(options.data)) {
            element.setAttribute(`data-${key}`, value);
        }
    }

    return element.outerHTML;
};
