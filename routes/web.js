var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.status(200).render('index', {title: 'Home'});
});

module.exports = router;
