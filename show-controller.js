const path = require('path');
const db = require('./db.js');
const moment = require('moment');

// 显示登录页的功能
function sign (req,res) {
    res.sendFile(path.join(__dirname,'view','sign.html'));
};

//显示首页
function index (req,res) {
    res.sendFile(path.join(__dirname,'view','blog','index.html'));
};

//显示添加页
function add (req,res) {
    res.sendFile(path.join(__dirname,'view','blog','add.html'));
}
// 导出模块
module.exports = {sign,index,add};