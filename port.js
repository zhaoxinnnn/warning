const PORT = 3000;
const http = require('http');
const path = require('path');
const express = require('express');
const async = require('async');
const DateMethod = require("./background/date");
var mysql = require('mysql');
var config = require('./config.js').config;

let resultJSON = [];
let dateObj = {
    'today': 0,
    'week': 7,
    'month': 30,
    'all': ''
};
let dateFn = new DateMethod();

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


const getAllDatas = require('./background/readFiles');


let app = express();
let server = http.createServer(app);
//指定静态文件的位置
app.use(express.static(path.resolve(__dirname,'./dist')));
app.get('/getDatas',function(req,res){
    var day;
    var promise =  new Promise(function(resolve,reject){
        if(!day){
            day = dateFn.getToday();
        }else{
            day = dateFn.getSomeDay(dateObj[day]);
        };
        if(resultJSON.length !== 0){
            resultJSON = [];
        };
        concatSql = `select * from ${config.mysqlConf.table} ${day?`where t2 >= '${day}'`:''}`;
        console.log(concatSql)
        connection.query(concatSql, function(err, result) {
            if (err) {     
                reject(new Error('no data'));
            }else{
                for(let i = 0;i<result.length;i++){
                    let cur = result[i];
                    let index = cur['t'].indexOf('.');
                    cur['t'] = cur['t'].slice(0,index);
                    cur['appPath'] = decodeURIComponent(cur['appPath']);
                }
                resolve(result);
            };
        });
    });
    promise.then(function(resultJSON){
        res.end(JSON.stringify(resultJSON));
    },function(error){
        console.log('error'+error);
    });
});
app.get('/getDatas/:param',function(req,res){
    let day = req.params.param;
    var promise =  new Promise(function(resolve,reject){
        if(day != 'all'){
            day = dateFn.getSomeDay(dateObj[day]);
        }else{
            day = '';
        }
        if(resultJSON.length !== 0){
            resultJSON = [];
        };
        concatSql = `select * from ${config.mysqlConf.table} ${day?`where t2 >= '${day}'`:''}`;
        console.log(concatSql)
        connection.query(concatSql, function(err, result) {
            if (err) {     
                reject(new Error('no data'));
            }else{
                for(let i = 0;i<result.length;i++){
                    let cur = result[i];
                    let index = cur['t'].indexOf('.');
                    cur['t'] = cur['t'].slice(0,index);
                    cur['appPath'] = decodeURIComponent(cur['appPath']);
                }
                resolve(result);
            };
        });
    });
    promise.then(function(resultJSON){
        res.end(JSON.stringify(resultJSON));
    },function(error){
        console.log('error'+error);
    });
});

//监听端口号
server.listen(PORT,function(){
    console.log("服务启动成功");
});