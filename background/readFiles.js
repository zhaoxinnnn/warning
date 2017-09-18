const path = require("path")
const fs = require("fs");
const DateMethod = require("./date");


let resultJSON = [];
let filesPath = path.resolve(__dirname,"../files");
let dirs = [];
let dateObj = {
    'today': 0,
    'week': 7,
    'month': 30,
    'all': ''
};
let dateFn = new DateMethod();
dirs.push(filesPath);

function isExist (fileDate,day) {
    let date = new Date().getTime(),isRead = true;
    fileDate = new Date(fileDate).getTime();
    return fileDate <= date && fileDate >= day;
};

function readDir (dirPath, day) {
    if(!day){
        day = dateFn.getToday();
    }else{
        day = dateFn.getSomeDay(dateObj[day]);
    };
    if(dirPath){
        let filesAry  = fs.readdirSync(dirPath);
        filesAry.reverse();
        if(resultJSON.length !== 0){resultJSON = [];};
        for(let curFile of filesAry){
            let fileDate = curFile.split('_')?curFile.split('_')[1]:"";
            let isRead = isExist(fileDate,day);
            console.log(isRead);
            isRead?readFiles(curFile):null;
        }
    }
}

function readFiles (filePath) {
    let fileText = fs.readFileSync("./files/"+filePath,"utf8");
    if(fileText){
        data = fileText.split(/\n/g);
        data.reverse();
        for(let curData of data){
            if(curData){
                let curDataObj = {},interfacePath;
                curDataObj["dateStr"] = curData.match(/\[(.*?)(?=\])\]/g)?curData.match(/\[(.*?)(?=\])\]/)[1].split(/\s+/)[0]:"";
                interfacePath = curData.match(/(\/jk_send.gif[^\s]+)/g)?curData.match(/(\/jk_send.gif[^\s]+)/g)[0]:"";
                interfacePath = interfacePath.split(/&/);
                for(let i = 0;i<interfacePath.length;i++){
                    let aryItem = interfacePath[i];
                    if(i == 0){
                        curDataObj["classId"] = aryItem.match(/\d+/)?aryItem.match(/\d+/)[0]:"";
                    }else{
                        aryItem = aryItem.split("=");
                        if(aryItem[0] == 't')continue;
                        if(aryItem[0] == 'err_status'){
                            aryItem[1] = aryItem[1]=='1'?'接口超时':'接口报错';
                        }
                        aryItem?curDataObj[aryItem[0]] = aryItem[1]:"";
                    }
                }
                curDataObj["appPath"] = curData.match(/\"(.*?)(?=\")\"/g)?curData.match(/\"(.*?)(?=\")\"/g)[1].replace(/\"/g,""):"";
                resultJSON.push(curDataObj);
            };
        };
    };

};

function getAllDatas(day) {
    console.log(day);
    for(let filePath of dirs){
        let statInfo = fs.statSync(filePath);
        if(statInfo){
            readDir(filePath,day);
        }       
    };
    return resultJSON;
};

module.exports = getAllDatas;
