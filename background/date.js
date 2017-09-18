let DateMethod = function () {};

DateMethod.prototype.getToday = function () {
    let today = this.handleDay();
    return new Date(`${today} 00:00:00`).getTime();
};

DateMethod.prototype.getSomeDay = function (time) {
    if(!time)return '';
    let someDay = new Date(this.getToday());
    let otherDay = new Date(someDay);
    otherDay.setDate(someDay.getDate() - time);
    return new Date(`${otherDay.getFullYear()}-${otherDay.getMonth() + 1}-${otherDay.getDate()} 00:00:00`).getTime();
};

DateMethod.prototype.handleDay = function() {
    let today = new Date();
    let year,month,date;
    year = today.getFullYear();
    month = today.getMonth() + 1;
    date = today.getDate();
    return year + '-' + month + '-' + date;
};

module.exports = DateMethod;