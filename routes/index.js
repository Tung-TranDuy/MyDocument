var express = require('express');
var router = express.Router();
var bkfd2Password = require('pbkdf2-password');
var hash = bkfd2Password();
var user_controller = require("../controllers/userController");

router.post('/login',user_controller.login);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;
