const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'passport'
});

connection.connect((err)=>{
    if(!err){
        console.log("Connected successfully");
    }else{
        console.log("Failed to connect");
    }
});

module.exports = connection ;