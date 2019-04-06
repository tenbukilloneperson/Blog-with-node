//   数据库

// 加载数据库模块
const mysql = require('mysql');

// 创建连接对象
const connection  = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    port : '3306',
    database : 'node'
});

// 连接数据库
connection.connect();

// 导出数据库模块
module.exports = connection;