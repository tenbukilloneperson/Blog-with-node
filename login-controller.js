// 逻辑页的处理
const db = require('./db.js');

// 检测登录用户名和密码
function login(req,res) {
    // 接收POST参数
    const username = req.body.username;
    const password = req.body.password;
    // 拼接SQL语句
    const sql = 'select * from blog_user where user_name =? and user_pwd = ?';
    // 执行查询结果,
    db.query(sql,[username,password],(error,result) =>{
        if(error || result.length !==1) {
            res.json({code : 201, message : '登录失败'});
        }
        if(result.length === 1) {
            //若登录成功,存储session
            req.session.isLogin = true;
            req.session.userInfo = result[0];
            res.json({code : 200, message : '登录成功'});
        }
    })
};


function logout (req,res) {
    req.session.destroy();
    res.redirect('/sign');
}

// 导出模块
module.exports = {login,logout};