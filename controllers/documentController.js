const { render } = require("../app");
const Content = require("../models/content");


function authority(req, res){
  if (req.session){
    if (req.session.user) return true
    return false
  }
  return false
}

exports.documents = function(req, res){
  if(!authority(req, res)){res.render("login")}
  const content = Content.getContents().then((result) => {
    res.locals.documents = result;
    res.render('documents');
  });
}


