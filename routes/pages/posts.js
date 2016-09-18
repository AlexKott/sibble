const marked = require('marked');
const router = require('express').Router(); // eslint-disable-line
const postService = require(`${__base}/services/postService`);

router.route('/:id')
    .get((req, res) => {
        postService
            .findOne(req.params.id)
            .then((result) => {
                const post = result.data;
                post.attributes.content = marked(post.attributes.content);

                return res.render(
                    'post',
                    { post, title: post.attributes.title }
                );
            })
            .catch(result => res.render('error', { error: result.error }));
    });

module.exports = router;
