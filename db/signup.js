const connection = require('./../config');
module.exports.signup = function(req,res){
    var username = req.body.username ;
    var password = req.body.password;
    var displayName = req.body.displayName;
    var email = req.body.email;
    var file = req.file.filename;
    connection.query("INSERT INTO passport(username,password,displayName,email,image)VALUE('"+username+"','"+password+"','"+displayName+"','"+email+"','"+file+"')" , function(err,records){
        if(!err){
            res.render('home' , {user:req.user});
        }else{
            res.end('This username is not availble');
            console.log(err);
        }
    });
}