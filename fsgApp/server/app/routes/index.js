'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/login', require('./login'));
router.use('/filetree', require('./filetree'));
router.use('/timeline', require('./timeline'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});