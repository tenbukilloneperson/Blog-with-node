// 功能:创建服务器、 托管静态资源、加载第三方模块并配置或者注册为中间件、加载路由模块;

// 1.创建服务器
const express = require('express');
const app = express();
const moment = require('moment');
app.listen(3000,() => {
    console.log('博客服务器开启:3000');
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'));;
});

// 2.托管静态资源
app.use('/node_modules',express.static('./node_modules'));
app.use('/assets',express.static('./view/assets'));

// 3.加载第三方模块并注册为中间件

//加载模板引擎并配置
const template = require('express-art-template');
app.engine('html',template);


// 加载body-parser并注册为中间件
const bp = require('body-parser');
app.use(bp.urlencoded({extended : false}));

//加载跨域cors,并配置;
const cors = require('cors');
const config_cors = {
    origin : 'http:127.0.0.1:4000',
    optionsSuccessStatus : 200
};
app.use(cors(config_cors));

// 加载session方式
const session = require('express-session');
const config_session = {
    secret : 'whatsthis',
    resave : false,
    saveUninitialized : false
};
app.use(session(config_session));

// 检测登录状态中间件
app.use(app_isLogin);

// 4. 加载路由模块并注册为中间件
const router = require('./router.js');
app.use(router);

// 检测登录状态的中间件
function app_isLogin(req,res,next) {
    if(!req.session.isLogin  && req.url !== '/sign' && req.url !=='/checkLogin') {
        res.redirect('/sign');
    };
    next();
};

