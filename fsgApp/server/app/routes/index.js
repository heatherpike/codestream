'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/login', require('./login'));
router.use('/filetree', require('./filetree'));
router.use('/timeline', require('./timeline'));
router.use('/file_update', require('./file_update'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});


