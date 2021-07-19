var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('products');
});

router.get('/add', function(req, res, next) {
    res.send('welcome to add product');
});

module.exports = router;
