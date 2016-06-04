var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/faq', function(req, res) {
  res.render('faq');
});
router.get('/:lng/faq', function(req, res) {
  res.render('faq');
});
router.get('/tos', function(req, res) {
  res.render('tos');
});
router.get('/:lng/tos', function(req, res) {
  res.render('tos');
});
router.get('/:lng', function(req, res) {
  res.render('index');
});

module.exports = router;
