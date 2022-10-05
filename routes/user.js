let { Router } = require("express");

let router = Router()
// Notice how we don't need to define the /users URI (path) but only the subpaths
// because we did this already in the mounting process of the route in the Express application (see app.js file)
router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.users));
});

router.get('/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
});

router.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
});

router.put('/:userId', (req, res) => {
    return res.send(
        `PUT HTTP method on user/${req.params.userId} resource`,
    );
});

router.delete('/:userId', (req, res) => {
    return res.send(
        `DELETE HTTP method on user/${req.params.userId} resource`,
    );
});

module.exports = router