var express = require('express');
var router = express.Router();
var bkfd2Password = require('pbkdf2-password');
var hash = bkfd2Password();
var UserController = require("../controllers/userController");
var DocumentController = require("../controllers/documentController")

router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/documents', DocumentController.documents);

module.exports = router;
