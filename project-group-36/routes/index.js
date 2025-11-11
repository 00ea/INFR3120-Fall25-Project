var express = require('express');
var router = express.Router();

/* GET page2. */
router.get('/', function(req, res, next) {
  res.render('page1', { title: 'Page 1'});
});

/* GET page2. */
router.get('/page2', function(req, res, next) {
  res.render('page2', { title: 'Page 2'});
});

/* GET page3. */
router.get('/page3', function(req, res, next) {
  res.render('page3', { title: 'Page 3'});
});

/* GET page4. */
router.get('/page4', function(req, res, next) {
  res.render('page4', { title: 'Page 4'});
});

module.exports = router;