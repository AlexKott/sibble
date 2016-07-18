require('babel-polyfill');
require('./FormRegister');

afterEach(() => {
    document.querySelector('#mocha').innerHTML = '';
});
