require('babelify-es6-polyfill');
require('./FormRegister');

afterEach(() => {
    document.querySelector('#mocha').innerHTML = '';
});
