// 请求数据
const db = require('./db.js');
const path = require('path');

// 获取首页的分页数据
function getIndex(req,res) {
    // 1.接收参数
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const userid = req.session.userInfo.user_id;
    console.log(page);
    console.log(pageSize);
    console.log(userid);
    // 2.拼接SQL语句
    const start = (page - 1 ) * pageSize;
    const sql = `select * from blog_article join blog_user on article_userid=user_id where article_userid=${userid} order by article_id desc limit ${start},${pageSize}`;
    // 3.执行SQK语句
    db.query(sql,(error,result) => {
        if(error) {
            return console.log(error);
        }
        return res.json(result);
    });
    // 4.处理执行结果
};

// 删除文章的数据处理
function del (req,res) {
    // 1. 接收参数
    const id = req.query.id;
    // 2. 拼接SQL语句
    const sql = 'delete from blog_article where article_id = ?';
    // 3. 执行SQL语句
    db.query(sql,id,(error,result) => {
        if(error) {
           return  res.json({code : 201,message : '删除失败'});
        }
        return res.json({code : 200,message : '删除成功'});
    });
    // 4. 处理查询结果
};

// 编辑文章功能(显示页面,同时渲染文本框的内容);
function edit (req,res) {

    // 1. 接收参数
    const id = req.query.id;
    // 2. 拼接SQL语句,
    const sql = 'select * from blog_article where article_id = ?';
    // 3. 执行SQL语句
    db.query(sql,id,(error,result) => {
        // console.log(result);
        if(error) return console.log(error);
        res.render(path.join(__dirname,'view','blog','edit.html'),result[0]);
    });
    // 4. 根基获取结果渲染数据
};


// 提交编辑模块
function editPost (req,res) {
    // 1. 接收参数
    const data = {
        article_title : req.query.title,
        article_content : req.query.content
    }
    const id = req.query.id;
    console.log(id, data);
    // 2. 拼接SQL
    const sql = 'update blog_article set ? where article_id = ?';
    // 3. 执行SQL
    db.query(sql,[data,id],(error,result) => {
        if(error) {
            console.log(error);
            return res.json({code : 201,message : '修改失败'})
        }
        if(result.affectedRows){
            return res.json({code : 200,message: '修改成功'});
        }

    });
    // 4. 处理执行结果
};
//导出模块
module.exports = {getIndex ,del,edit,editPost};