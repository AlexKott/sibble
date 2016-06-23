const _ = require('lodash');
const dateUtil = require('../utils/dateUtil');
const slugUtil = require('../utils/slugUtil');
const router = require('express').Router(); // eslint-disable-line
const Post = require('../models/post');

router.route('/posts')
    .get((req, res) => {
        Post.find({}, (err, posts) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }] });
            } else if (posts.length === 0) {
                return res.status(204).send();
            }
            return res.send({ data: posts });
        });
    })
    .post((req, res) => {
        const newPost = new Post(req.body.data);

        if (!_.get(newPost, 'attributes.dateCreated')) {
            newPost.attributes.dateCreated = dateUtil.getToday();
        }
        newPost.id = slugUtil.generateSlug(
             newPost.attributes.title,
             newPost.attributes.dateCreated
         );

        const validatePost = new Promise((resolve, reject) => {
            Post.findOne({ id: newPost.id }, (err, data) => {
                if (data) {
                    reject();
                } else {
                    resolve();
                }
            });
        });

        validatePost.then(() => {
            newPost.save((err, data) => {
                if (err) {
                    return res.status(500).send({ errors: [{ detail: err }] });
                }
                return res.status(201).send({ data });
            });
        }).catch(() =>
            res.status(409).send({ errors: [{ detail: 'Post already exists!' }] })
        );
    })
    .delete((req, res) => {
        Post.remove({}, err => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }] });
            }
            return res.status(204).send();
        });
    });
router.route('/posts/:id')
    .get((req, res) => {
        Post.findOne({ id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }] });
            } else if (!data) {
                return res.status(404).send();
            }
            return res.send({ data });
        });
    })
    .patch((req, res) => {
        Post.findOneAndUpdate({ id: req.params.id }, req.body.data, { new: true }, (err, data) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }] });
            }
            return res.send({ data });
        });
    })
    .delete((req, res) => {
        Post.findOneAndRemove({ id: req.params.id }, err => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }] });
            }
            return res.status(204).send();
        });
    });

module.exports = router;
