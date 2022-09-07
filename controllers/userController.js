const db = require("../models/user")
var bkfd2Password = require('pbkdf2-password');
var hash = bkfd2Password();

function authenticate(name, pass, fn){
    var user = db.users[0];
    if (name != user.name) return fn(null, null)

    hash({password: pass, salt: user.salt}, function(err, pass, salt, hash) {
      if (err) return fn(err);
      if(hash === user.hash) return fn(null, user)
      fn(null, null)
    });
}

exports.login = function(req, res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if(user){
      res.render("login", {message: "login successful"});
    }else{
      res.render("login", {message: "login failed"});
    }
  })
}
