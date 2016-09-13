module.exports = {
    build(obj) {
        if (Object.hasOwnProperty.call(obj, 'data')) {
            if (Object.hasOwnProperty.call(obj.data, 'attributes')) {
                return obj;
            }
            return { data: { attributes: obj.data } };
        } else if (Object.hasOwnProperty.call(obj, 'attributes')) {
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
