const router = require('express').Router(); // eslint-disable-line
const postService = require(`${__base}/services/postService`);

router.route('/')
    .get((req, res) => {
        postService
            .findAllAndSort('dateCreated')
            .then(result => res.render(
                'posts',
                { posts: result.data, title: 'Start' }
            ))
            .catch(result => res.render('error', { error: result.error }));
    });

module.exports = router;
