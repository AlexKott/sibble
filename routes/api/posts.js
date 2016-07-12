const _ = require('lodash');
const dateUtil = require(`${__base}/utils/dateUtil`);
const slugUtil = require(`${__base}/utils/slugUtil`);
const jsonApi = require(`${__base}/utils/jsonApi`);
const validatePost = require(`${__base}/utils/validatePost`);
const router = require('express').Router(); // eslint-disable-line
const Post = require(`${__base}/models/post`);

router.route('/posts')
    .get((req, res) => {
        Post.find({}, (err, data) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }] });
            } else if (data.length === 0) {
                return res.status(204).send();
            }
            return res.send({ data });
        });
    })
    .post((req, res) => {
        jsonApi.validate(req.body).then((post) => {
            const newPost = new Post(post.data);

            if (!_.get(newPost, 'attributes.dateCreated')) {
                newPost.attributes.dateCreated = dateUtil.getToday();
            }
            newPost.id = slugUtil.generateSlug(
                 newPost.attributes.title,
                 newPost.attributes.dateCreated
             );

            validatePost(newPost).then(() => {
                newPost.save((err, data) => {
                    if (err) {
                        return res.status(500).send({ errors: [{ detail: err }] });
                    }
                    return res.status(201).send({ data });
                });
            }).catch(() => res.status(409).send({ errors: [{ detail: 'Post already exists!' }] }));
        }).catch(() => res.status(422).send({ errors: [{ detail: 'Bad data format!' }] }));
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
