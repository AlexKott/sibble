const router = require('express').Router(); // eslint-disable-line
const Post = require(`${__base}/models/post`);

router.route('/')
    .get((req, res) => {
        Post.find({}, (err, data) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }] });
            }
            return res.render('posts', { posts: data });
        });
    });
router.route('/:id')
    .get((req, res) => {
        Post.findOne({ id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }] });
            } else if (!data) {
                return res.status(404).send();
            }
            return res.render('post', { post: data, title: data.attributes.title });
        });
    });

module.exports = router;
