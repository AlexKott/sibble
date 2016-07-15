const router = require('express').Router(); // eslint-disable-line
const postService = require(`${__base}/services/postService`);

router.route('/')
    .get((req, res) => {
        postService
            .findAllAndSort('dateCreated')
            .then(result => res.render(
                'admin',
                { posts: result.data, title: 'Admin' }
            ))
            .catch(result => res.render('error', { error: result.error }));
    });
router.route('/new')
    .get((req, res) => res.render('new-post', { title: 'New Post' }));
router.route('/login')
    .get((req, res) => res.render('login', { title: 'Login' }));

module.exports = router;
