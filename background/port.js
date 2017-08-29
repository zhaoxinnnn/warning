let PORT = 3000;
const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");

var server = http.createServer(function(req,res){

    let indexFile = path.resolve(__dirname,"../index.html");
    fs.exists(indexFile,function(exists){
        if(!exists){
            res.writeHead(404,{
                "Content-Type" : "text/plain"
            });
            res.write("404!您要找的页面跑到火星去了,请稍后再试!","utf8");
            res.end();
        }else{
            fs.readFile(indexFile,function(err,data){
                if(err){
                    res.writeHead(500,{
                        "Content-Type" : "text/plain"
                    });
                    res.end(err);
                }else{
                    res.writeHead("200",{
                        "Content-Type" : "text/html"
                    });
                    res.write(data.toString());
                    res.end();
                }
            })
        }
    });
});
server.listen(PORT);
console.log("服务器启动成功");