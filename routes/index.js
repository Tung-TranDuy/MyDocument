var express = require('express');
var router = express.Router();
var bkfd2Password = require('pbkdf2-password');
var hash = bkfd2Password();
// dummy database

var users = {
  tj: { name: 'tj' }
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

hash({ password: 'foobar'}, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});


function authenticate(name, pass, fn){
  var user = users[name];
  if (!user) return fn(null, null);

  hash({password: pass, salt: user.salt}, function(err, pass, salt, hash) {
    if (err) return fn(err);
    if(hash === user.hash) return fn(null, user)
    fn(null, null) 
  });
}


router.post('/login', function(req, res, next){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if(user){
      console.log("login suggest")
    }else{
      console.log("login fails")
    }
  })
  res.render('login');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;
