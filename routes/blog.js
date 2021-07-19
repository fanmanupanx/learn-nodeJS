var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const monk = require('monk')

// Connection URL
const url = 'localhost:27017/learn';
const db = monk(url);
db.then(() => {
    console.log('Connected correctly to server')
  })

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('blog');
});

router.get('/add', function(req, res, next) {
    res.render('addBlog');
});

router.post('/add',
    body('name','please input blog name').notEmpty()
    ,body('detail','please input detail').notEmpty()
    ,body('author','please input author').notEmpty()
    , function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('addBlog',{errors:errors.array()} );
           // return res.status(400).json({ errors: errors.array() });
        //console.log(errors);
        }else
        {   
            //save db
            const collection = db.get('blog')

            collection.insert([{name: req.body.name}, {detail: req.body.detail}, {author: req.body.author}])
            .then((docs) => {
                // docs contains the documents inserted with added **_id** fields
                // Inserted 3 documents into the document collection

            }).catch((err) => {
                // An error happened while inserting
            }).then(() => {db.close();  res.render('index', { title: 'mongodb Express' });})
           
        }
        
});

module.exports = router;
