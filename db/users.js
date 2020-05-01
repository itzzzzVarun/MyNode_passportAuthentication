const connection = require('./../config');
exports.findById = function(id, cb){
    connection.query("SELECT * FROM passport" , (err,records)=>{
        if(records.length){
            process.nextTick(function(){
                var idx = id -1 ;
                if(records[idx]){
                    cb(null, records[idx]);
                }else{
                    cb(new Error('User '+ id + ' does not exist'));
                }
            });
        }
    })
}

exports.findByUsername = function(username, cb){
    connection.query("SELECT * FROM passport" , (err,records)=>{
        process.nextTick(function(){
            for(var i = 0, len=records.length; i<len ;  i++){
                var record = records[i];
                if(record.username==username){
                    return cb(null, record);
                }
            }
            return cb(null , null);
        });
    });
}