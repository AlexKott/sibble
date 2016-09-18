const router = require('express').Router(); // eslint-disable-line
const postService = require(`${__base}/services/postService`);

router.route('/:id')
    .get((req, res) => {
        postService
            .findOne(req.params.id)
            .then(result => res.render(
                'post',
                { post: result.data, title: result.data.attributes.title }
            ))
            .catch(result => res.render('error', { error: result.error }));
    });

module.exports = router;
