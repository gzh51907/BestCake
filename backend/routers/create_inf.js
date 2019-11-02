const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'userinf';//当前路由所操作的集合为listpages
const { formatData } = require('../utlis');//引入数据响应格式

//把用户信息存到数据库
router.get('/create', async (req, res) => {
    let {
        phone,
        password
    } = req.query;
    // console.log('phone:', phone, 'password:', password)
    console.log('phone:', req.query.phone, 'password', req.query.password)
    try {
        let result = await mongo.create(colName, [{ phone, password }]);
        // console.log('result:', result);
        res.send(formatData({}));
    } catch{
        res.send(formatData({ code: 0 }));
    }
})
module.exports = router;