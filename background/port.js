const PORT = 3000;
const http = require('http');
const path = require('path');
const express = require('express');

const resultJSON = require('./readFiles');


let app = express();
let server = http.createServer(app);
let routerSrc = express.static(path.resolve(__dirname,'../dist'));
//指定静态文件的位置
app.use(routerSrc,function(req,res){
    res.end(JSON.stringify(resultJSON));
});

//监听端口号
server.listen(PORT,function(){
    console.log("服务启动成功");
});