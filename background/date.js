let DateMethod = function () {};

DateMethod.prototype.getToday = function () {
    let today = new Date();
    let year,month,date;
    year = today.getFullYear();
    month = (today.getMonth() + 1)<10?'0'+ (today.getMonth() + 1):(today.getMonth() + 1);
    date = today.getDate()<10?'0'+today.getDate():today.getDate();
    return `${year}-${month}-${date}`;
};


DateMethod.prototype.getSomeDay = function (time) {
    if(!time && time != 0)return '';
    let someDay = new Date();
    let otherDay = new Date(someDay);
    otherDay.setDate(someDay.getDate() - time);
    let year = otherDay.getFullYear();
    let month = (otherDay.getMonth() + 1)<10?'0'+ (otherDay.getMonth() + 1):(otherDay.getMonth() + 1);
    let date = otherDay.getDate()<10?'0'+otherDay.getDate():otherDay.getDate();
    return `${year}-${month}-${date}`;
};


module.exports = DateMethod;