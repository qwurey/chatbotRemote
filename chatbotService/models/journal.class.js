class Journal {
    //构造函数
    constructor(ip, date) {
        this.data = date;//类中变量
        this.ip = ip;
    }
}
//静态变量
Journal.ip = '';
Journal.date = '';
module.exports = Journal;
