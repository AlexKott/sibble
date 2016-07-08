import postService from '../src/js/postService';
const sinon = require('sinon');

let xhr;
let requests;

describe('post service', () => {
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

    it('makes a POST request if save is called', () => {
        postService.save({ data: 'saving' })
            .then(() => sinon.spy());

        assert.equal(requests.length, 1);
        assert.include(requests[0].url, '/api/posts/');
    });
});
