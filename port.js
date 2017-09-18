const PORT = 3000;
const http = require('http');
const path = require('path');
const express = require('express');
const async = require('async');

const getAllDatas = require('./background/readFiles');


let app = express();
let server = http.createServer(app);
//指定静态文件的位置
app.use(express.static(path.resolve(__dirname,'./dist')));
app.get('/getDatas',function(req,res){
    console.log('index');
    let resultJSON = getAllDatas();
    res.end(JSON.stringify(resultJSON));
});
app.get('/getDatas/:param',function(req,res){
    let params = req.params.param;
    let resultJSON = getAllDatas(params);
    res.end(JSON.stringify(resultJSON));
});

//监听端口号
server.listen(PORT,function(){
    console.log("服务启动成功");
});