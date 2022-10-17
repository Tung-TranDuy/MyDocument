const db = require("../models/user")
const Content = require("../models/content");
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

exports.logout = function(req, res){
  if (req.session){
    if(req.session.user) delete req.session.user
  }
  res.render("login")
} 

exports.login = function(req, res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if(user){
      req.session.regenerate(function(err){
        if (!req.session.success){
          req.session.user = user ;
          req.session.success = 'Authenticated as ' + user.name;
        }
        // res.locals.message = "login success"
        res.redirect('documents');
      });
    }else{
      req.session.error = "Authentication failed, please check your accout"
      res.redirect("back");
    }
  })
}
