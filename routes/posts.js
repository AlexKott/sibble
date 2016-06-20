const _ = require('lodash');
const dateUtil = require('../utils/dateUtil');
const slugUtil = require('../utils/slugUtil');
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
                    return res.status(500).send({ errors: [{ detail: err }]});
                }
                res.status(201).send({ data: data });
            });
        }).catch(() => {
            return res.status(409).send({ errors: [{ detail: 'Post already exists! '}]});
        });
    });
router.route('/posts/:id')
    .get((req, res) => {
        Post.findOne({ id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500).send({ errors: [{ detail: err }]});
            }
            res.send({ data: data });
        })
    })
    .patch((req, res) => {

    })
    .delete((req, res) => {

    });

module.exports = router;
