const API = '/api/posts/';

function request(method, data, post) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const uri = post ? API + post : API;

        xhr.open(method, uri);
        xhr.send();

        xhr.onload = function onload() {
            if (this.status >= 200 && this.status < 300) {
                resolve(this.response);
            } else {
                reject(this.statusText);
            }
        };
        xhr.onerror = function onerror() {
            reject(this.statusText);
        };
    });
}

export default {
    save(data) {
        return request('POST', data);
    },
    update(data, post) {
        return request('PUT', data, post);
    },
};
