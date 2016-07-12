const Post = require(`${__base}/models/post`);

module.exports = function validatePost(post) {
    return new Promise((resolve, reject) => {
        Post.findOne({ id: post.id }, (err, data) => {
            if (data) {
                reject();
            } else {
                resolve();
            }
        });
    });
};
