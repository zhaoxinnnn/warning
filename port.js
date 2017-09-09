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
    let resultJSON = getAllDatas();
    console.log(resultJSON)
    res.end(JSON.stringify(resultJSON));
})

//监听端口号
server.listen(PORT,function(){
    console.log("服务启动成功");
});