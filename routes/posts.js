const _ = require('lodash');
const dateUtil = require('../utils/dateUtil');
const router = require('express').Router();
const Post = require('../models/post');

router.route('/posts')
    .get((req, res) => {
        Post.find({}, (err, posts) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            }
            res.send({ data: posts });
        });
    })
    .post((req, res) => {
        const newPost = new Post(req.body.data);

        if (!_.get(newPost, 'attributes.dateCreated')) {
            newPost.attributes.dateCreated = dateUtil.getToday();
        }

        newPost.save((err, data) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            }
            res.status(201).send({ data: data });
        });
    });
router.route('/posts/:id')
    .get((req, res) => {

    })
    .patch((req, res) => {

    })
    .delete((req, res) => {

    });

module.exports = router;
