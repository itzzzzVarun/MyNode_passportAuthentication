const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('./db');
const path = require('path');
const multer = require('multer');
const signup = require('./db/signup');
require('./routes/passport')(passport , Strategy , db);

const app = express();

app.set('views' , __dirname+'/views');
app.set('view engine' , 'ejs');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended:true}));
app.use(require('express-session')({secret:'keyboard cat' , resave:false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname ,'public')));
app.use(express.static('./public/uploads'));


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null , './public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,(file.name=file.originalname));
    }
});

const upload = multer({storage:storage});

app.post('/db/signup',upload.single('file'), signup.signup);

require('./routes')(app, passport);

app.listen(5050 , ()=>{
    console.log("Server listening at port at 5050");
})