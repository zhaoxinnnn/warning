var mysql = require('mysql');
var config = require('../config.js').config;

var connection = mysql.createConnection({
    host:config.mysqlConf.host,
    user:config.mysqlConf.user,
    password:config.mysqlConf.password,
    port:config.mysqlConf.port,
    database:config.mysqlConf.database
});

connection.connect(function(err){
    if(err){
        console.log('error')
        return resultJSON;
    }else{
        let updateObj = {};
        console.log('connect success');
        connection.query('select id,t from logtest',function(err, rows, fields){
            for(let item of rows){
                let t2 = item['t'];
                if(t2 != ''){
                    t2 = t2.split(' ')[0];
                }else{
                    t2 = '';
                }
                updateObj[item['id']] = t2;
            };
            for(let key in updateObj){
                let value = updateObj[key];
                console.log(key,value)
                connection.query(`update logtest set t2 = "${value}" where id = ${key}`,function (err, result) {
                    
                       if(err){
                    
                             console.log('[UPDATE ERROR] - ',err.message);
                    
                             return;
                    
                       }       
                    
                      console.log('----------UPDATE-------------');
                    
                      console.log('UPDATE affectedRows',result.affectedRows);
                    
                      console.log('******************************');
                    
                })
            }
        });
        
       
    }
});

