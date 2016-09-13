const _ = require('lodash');
const dateUtil = require(`${__base}/utils/dateUtil`);
const slugUtil = require(`${__base}/utils/slugUtil`);
const jsonApi = require(`${__base}/utils/jsonApi`);
const Post = require(`${__base}/models/post`);

module.exports = {
    findAll() {
        return new Promise((resolve, reject) => {
            Post.find({}, (error, posts) => {
                if (error) {
                    reject({ error, data: null });
                } else if (posts.length === 0) {
                    resolve({ error: null, data: null });
                } else {
                    resolve({ error: null, data: posts });
                }
            });
        });
    },
    findAllAndSort(sortBy) {
        return new Promise((resolve, reject) => {
            Post.find({}, (error, posts) => {
                if (error) {
                    reject({ error, data: null });
                } else if (posts.length === 0) {
                    resolve({ error: null, data: null });
                } else {
                    const sortedPosts = posts.sort((a, b) => {
                        if (a.attributes[sortBy] > b.attributes[sortBy]) {
                            return -1;
                        }
                        return 1;
                    });
                    resolve({ error: null, data: sortedPosts });
                }
            });
        });
    },
    findOne(id) {
        return new Promise((resolve, reject) => {
            Post.findOne({ id }, (error, post) => {
                if (error) {
                    reject({ status: 404, error });
                } else if (!post) {
                    reject({ status: 404, error: 'Post not found!' });
                } else {
                    resolve({ error: null, data: post });
                }
            });
        });
    },
    save(data) {
        return new Promise((resolve, reject) => {
            jsonApi
                .validate(data)
                .then((jsonApiObj) => {
                    const post = new Post(jsonApiObj.data);

                    if (!_.get(post, 'attributes.dateCreated')) {
                        post.attributes.dateCreated = dateUtil.getToday();
                    }

                    post.id = slugUtil.generateSlug(
                         post.attributes.title,
                         post.attributes.dateCreated
                     );

                    this
                        .isNewEntry(post.id)
                        .then(() => {
                            post.save((error, rPost) => {
                                if (error) {
                                    reject({ status: 500, error });
                                }
                                resolve({ data: rPost });
                            });
                        })
                        .catch(() => {
                            reject({ status: 409, error: 'Post already exists!' });
                        });
                })
                .catch(() => reject({ status: 422, error: 'Bad data format!' }));
        });
    },
    update(id, data) {
        return new Promise((resolve, reject) => {
            jsonApi
                .validate(data)
                .then((jsonApiObj) => {
                    Post.findOneAndUpdate(
                        { id },
                        jsonApiObj.data,
                        { new: true },
                        (error, post) => {
                            if (error) {
                                reject({ error });
                            } else {
                                resolve({ data: post });
                            }
                        });
                });
        });
    },
    deleteAll() {
        return new Promise((resolve, reject) => {
            Post.remove({}, (error) => {
                if (error) {
                    reject({ error });
                } else {
                    resolve();
                }
            });
        });
    },
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            Post.findOneAndRemove({ id }, (error) => {
                if (error) {
                    reject({ error });
                } else {
                    resolve();
                }
            });
        });
    },
    isNewEntry(id) {
        return new Promise((resolve, reject) => {
            Post
                .find({ id })
                .limit(1)
                .exec((error, result) => {
                    if (result.length === 0 || error) {
                        resolve();
                    } else {
                        reject();
                    }
                });
        });
    },
};
