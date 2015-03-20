var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/chat', function (req, res){
	res.render('chat.ejs');
})



module.exports = router;
