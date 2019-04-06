// 处理不同页面的不同请求

const express = require('express');
//创建路由对象
const router = express.Router();

//登录页的逻辑处理
const login_c = require('./login-controller.js');

// 加载显示静态页面的controller层
const show_c = require('./show-controller.js');

// 加载请求数据的controller层
const db_c = require('./db-controller.js');

//显示登录页;
router.get('/sign',show_c.sign);

//显示首页;
router.get('/index',show_c.index);

//显示添加页
router.get('/add',show_c.add);
router.post('/checkLogin',login_c.login);

//退出模块
router.get('/logout',login_c.logout);

// 首页分页请求数据
router.get('/getIndex',db_c.getIndex);

// 首页文章的删除功能
router.get('/delArticle',db_c.del);

//首页文章的编辑功能
router.get('/edit',db_c.edit);

// 编辑提交模块
router.post('/editPost',db_c.editPost);

//导出模块
module.exports = router;
