const path = require("path")
const fs = require("fs");
const DateMethod = require("./date");
var mysql = require('mysql');
var config = require('../config.js').config;


let resultJSON = [];
let filesPath = path.resolve(__dirname,"../files");
let dirs = [];
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
        console.log('error')
        return resultJSON;
    }else{
        console.log('connect success')
    }
});

let dateFn = new DateMethod();
dirs.push(filesPath);

function isExist (fileDate,day) {
    let date = new Date().getTime(),isRead = true;
    fileDate = new Date(fileDate).getTime();
    return fileDate <= date && fileDate >= day;
};

function getDBData (day) {
    if(!day){
        day = dateFn.getToday();
    }else{
        day = dateFn.getSomeDay(dateObj[day]);
    };
    if(resultJSON.length !== 0){resultJSON = [];};
    concatSql = `select * from ${connection.database} ${day?`where t2 >= ${day}`:''}`;
    getSearchData(concatSql);
}



function getSearchData(sql){
    connection.query(sql, function(err, result) {       
            if (err) {     
                console.log('[query] - :'+err);   
                return;     
            }
            console.log('The solution is: ', result);
            console.log('*************************');
        }); 
}


function getAllDatas(day) {
    getDBData(day);
    return resultJSON;
};

module.exports = getAllDatas;
