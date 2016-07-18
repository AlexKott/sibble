export default {
    request(target, method, data) {
        const url = `/api/${target}`;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/vnd.api+json');
            xhr.send(JSON.stringify(data));

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
}
