import ajaxService from '../src/js/ajaxService';
const sinon = require('sinon');

let xhr;
let requests;

describe('ajax service', () => {
    before(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function onCreate(req) {
            requests.push(req);
        };
    });
    after(() => {
        xhr.restore();
    });
});
