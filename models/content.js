const mysql = require("mysql");
const dbconfig = require("../models/config/dbconfig");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sieunhan1994"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

exports.getContents= function(){
        return new Promise(function(resolve, reject){
          console.log(dbconfig);
          const db = mysql.createConnection(dbconfig);

          db.query('select id, content from content', function(err, result){
             if (err) reject(err);
             if (result) resolve(result)
           });
           db.end()
        })
     }


