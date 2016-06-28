const router = require('express').Router(); // eslint-disable-line

router.route('/')
    .get((req, res) => res.render('index', {}));

module.exports = router;
