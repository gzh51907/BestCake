const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'userinf';//当前路由所操作的集合为listpages
const { formatData } = require('../utlis');//引入数据响应格式
//检测手机号是否已注册
router.get('/check', async (req, res) => {
    let {
        phone
    } = req.query;
    // console.log('phone', phone);
    let result = await mongo.find(colName, { phone });
    // console.log('result:', result);
    if (result.length) {
        // 用户已存在
        res.send(formatData({ code: 0 }));
    } else {
        // 允许注册
        res.send(formatData());
    }
})
//登录监测
router.get('/check_login', async (req, res) => {
    let {
        logPhone,
        logPass
    } = req.query;
    // console.log('logPhone:', logPhone, 'logPass:', logPass)

    let result = await mongo.find(colName, { phone: logPhone, password: logPass });
    console.log('result:', result);
    if (result.length) {
        // 匹配成功
        console.log(111)
        res.send(formatData());
    } else {
        // 允许注册
        res.send(formatData({ code: 0 }));
    }
})

module.exports = router;