module.exports = {
    build(obj) {
        if (obj.hasOwnProperty('data')) {
            if (obj.data.hasOwnProperty('attributes')) {
                return obj;
            }
            return { data: { attributes: obj.data } };
        } else if (obj.hasOwnProperty('attributes')) {
            return { data: obj };
        }
        return { data: { attributes: obj } };
    },
    validate(data) {
        return new Promise((resolve, reject) => {
            if (true) { // eslint-disable-line
                resolve(this.build(data));
            } else {
                reject();
            }
        });
    },
};
