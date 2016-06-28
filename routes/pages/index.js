const router = require('express').Router(); // eslint-disable-line

router.route('/')
    .get((req, res) => {
        return res.render('index', {
            title: 'test',
            posts: [
                {
                    title: 'post1',
                },
                {
                    title: 'post2',
                },
            ],
        });
    });

module.exports = router;
