const router = require('express').Router(); // eslint-disable-line
const postService = require(`${__base}/services/postService`);

router.route('/posts')
    .get((req, res) => {
        postService
            .findAllAndSort('dateCreated')
            .then((result) => {
                if (!result.data) {
                    return res.status(204).send();
                }
                return res.status(200).send({ data: result.data });
            })
            .catch(result => res.status(500).send({ errors: [{ detail: result.error }] }));
    })
    .post((req, res) => {
        postService
            .save(req.body)
            .then(result => res.status(201).send({ data: result.data }))
            .catch(result => res.status(result.status)
                .send({ errors: [{ detail: result.error }] })
            );
    })
    .delete((req, res) => {
        postService
            .deleteAll()
            .then(() => res.status(204).send())
            .catch(result => res.status(500)
                .send({ errors: [{ detail: result.error }] })
            );
    });

router.route('/posts/:id')
    .get((req, res) => {
        postService
            .findOne(req.params.id)
            .then(result => res.status(200).send({ data: result.data }))
            .catch(result => res.status(result.status)
                .send({ errors: [{ detail: result.error }] })
            );
    })
    .patch((req, res) => {
        postService
            .update(req.params.id, req.body.data)
            .then(result => res.status(200).send({ data: result.data }))
            .catch(result => res.status(500)
                .send({ errors: [{ detail: result.error }] })
            );
    })
    .delete((req, res) => {
        postService
            .deleteOne(req.params.id)
            .then(() => res.status(204).send())
            .catch(result => res.status(500)
                .send({ errors: [{ detail: result.error }] })
            );
    });

module.exports = router;
