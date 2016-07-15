require('html-element');

module.exports = function tagBuilder(options) {
    const element = document.createElement(options.tagName);
    element.innerHTML = options.innerHTML;
    element.class = options.className;

    if (options.tagName === 'a') {
        element.href = options.href;
    }

    return element.outerHTML;
};
