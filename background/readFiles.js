const DateMethod = require("./date");
var mysql = require('mysql');
var config = require('../config.js').config;


let resultJSON = [];
let dateObj = {
    'today': 0,
    'week': 7,
    'month': 30,
    'all': ''
};

var connection = mysql.createConnection({
    host:config.mysqlConf.host,
    user:config.mysqlConf.user,
    password:config.mysqlConf.password,
    port:config.mysqlConf.port,
    database:config.mysqlConf.database
});

connection.connect(function(err){
    if(err){
        return resultJSON;
    }else{
        console.log('connect success');
    };
});

let dateFn = new DateMethod();


function getAllDatas(day) {
    
        if(!day){
            day = dateFn.getToday();
        }else{
            day = dateFn.getSomeDay(dateObj[day]);
        };
        if(resultJSON.length !== 0){
            resultJSON = [];
        };
        concatSql = `select * from ${config.mysqlConf.table} ${day?`where t2 >= '${day}'`:''}`;
        connection.query(concatSql, function(err, result) {
            if (err) {     
                console.log('error');
            }else{
                return result;
            };
        });
    
};

module.exports = getAllDatas;
