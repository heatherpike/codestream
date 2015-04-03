'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/login', require('../configure/authentication/local'));
router.use('/signup', require('../configure/authentication/local'))
router.use('/filetree', require('./filetree'));
router.use('/timeline', require('./timeline'));
router.use('/file_update', require('./file_update'));
router.use('/cli', require('./cli'));
router.use('/chat', require('./chat'));
router.use('/instructor', require('./instructor'));

// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
  res.status(req.err.status).send(req.err.message);
});