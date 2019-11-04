const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'usergoods';//当前路由所操作的集合为listpages
const { formatData } = require('../utlis');//引入数据响应格式
//未登录查询商品信息
router.get('/cart', async (req, res) => {
    let {
        user_phone
    } = req.query;
    console.log('user_phone:', user_phone);
    let result = await mongo.find(colName, user_phone);
    console.log('result:', result);
    if (result) {
        res.send(result);
    } else {
        // 没找到
        res.send(formatData());
    }
})


module.exports = router;