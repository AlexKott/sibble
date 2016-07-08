const router = require('express').Router(); // eslint-disable-line
const Post = require(`${__base}/models/post`);

router.route('/')
    .get((req, res) => {
        Post.find({}, (err, data) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }] });
            }
            return res.render('admin', { posts: data, title: 'Posts' });
        });
    });
router.route('/new')
    .get((req, res) => res.render('new-post', { title: 'New Post' }));
router.route('/login')
    .get((req, res) => res.render('login', { title: 'Login' }));

module.exports = router;
