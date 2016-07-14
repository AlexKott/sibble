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

module.exports = router;
