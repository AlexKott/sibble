const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: String,
    type: {
        type: String,
        default: 'posts',
    },
    attributes: {
        dateCreated: String,
        title: String,
        content: String,
    },
    relationships: {
        comments: {
            data: [
                {
                    id: {
                        type: String,
                        ref: 'Comment',
                    },
                    type: {
                        type: String,
                        default: 'comments',
                    },
                },
            ],
        },
    },
}, {
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            delete ret._id; // eslint-disable-line
        },
    },
});

module.exports = mongoose.model('Post', postSchema);
