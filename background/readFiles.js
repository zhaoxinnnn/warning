const path = require("path")
const fs = require("fs");
const resultJSON = [];

let filesPath = path.resolve(__dirname,"../files");
let dirs = [];
dirs.push(filesPath);

function forFiles (files, file_path, callback, allFilesDoneCallback) {
    let arrlength = files.length;
    if(!files || files.length == 0) {
        allFilesDoneCallback(file_path);
        return;
    }
    for(let i = 0;i<files.length;i++){
        let e = files[i];
        let fileReg = new RegExp(`access_2017-08-28_11_13.log`,"igm");
        if(!fileReg.test(e)){
            arrlength--;
            continue;
        }
        let fullFilePath = path.join(file_path, e);
        fs.stat(fullFilePath,function (err, stat) {
            let result = {
                isDir : false,
                isFile : true,
                file : fullFilePath
            };
            if(stat.isDirectory()){
                result.isDir = true;
                result.isFile = false;
            }else{
                result.isDir = false;
                result.isFile = true;
            };
            callback(result);
            arrlength--;
            if(arrlength == 0){
                allFilesDoneCallback(file_path);
            }
        });
    }
};

function forDir (dirPath, watchDir, callback) {
    fs.readdir(dirPath, function(err, files){
        let subFiles = [];
        forFiles(files, dirPath, function(result){
            if(result.isDir){
                watchDir.push(result.file);
                forDir(result.file, watchDir, callback);
            }else{
                subFiles.push(result.file);
            }
        },function(processDirPath){
            callback(processDirPath, subFiles);
        })
    })
};

function forDirs (dirs, doneCallback) {
    let copieDirs = dirs.slice(0);
    let watchDir = [];
    let allFiles = [];
    copieDirs.forEach(function(path){
       watchDir.push(path);
       forDir(path, watchDir, function(processedDirPath, subFiles){
           allFiles = allFiles.concat(subFiles);
           watchDir.splice(watchDir.indexOf(processedDirPath),1);
           if(watchDir.length == 0){
               doneCallback(allFiles);
           }
       })
    });
};

function readFiles (filePath) {

    fs.readFile(filePath,"utf8",function(err,data){
        let dateStr,classId,error_status,priority,interfacePath,appPath;
        if(!err){
            data = data.split(/\n/g);
            data.forEach(function(curData){
                if(curData){
                    let curDataObj = {};
                    curDataObj["dateStr"] = curData.match(/\[(.*?)(?=\])\]/g)?curData.match(/\[(.*?)(?=\])\]/)[1].split(/\s+/)[0]:"";
                    interfacePath = curData.match(/(\/jk_send.gif[^\s]+)/g)?curData.match(/(\/jk_send.gif[^\s]+)/g)[0]:"";
                    interfacePath = interfacePath.split(/&/);
                    for(let i = 0;i<interfacePath.length;i++){
                        let aryItem = interfacePath[i];
                        if(i == 0){
                            curDataObj["classId"] = aryItem.match(/\d+/)?aryItem.match(/\d+/)[0]:"";
                        }else{
                            aryItem = aryItem.split("=");
                            aryItem?curDataObj[aryItem[0]] = aryItem[1]:"";
                        }
                    }
                    curDataObj["appPath"] = curData.match(/\"(.*?)(?=\")\"/g)?curData.match(/\"(.*?)(?=\")\"/g)[1].replace(/\"/g,""):"";
                    resultJSON.push(curDataObj);
                }
            });
            console.log(resultJSON);
        }
    })

}


forDirs(dirs,function(filesArray){
    if(filesArray.length > 0){
        for(let filePath of filesArray){
            readFiles(filePath);
        };
    }
});


