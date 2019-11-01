const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'userinf';//当前路由所操作的集合为listpages
const { formatData } = require('../utlis');//引入数据响应格式
const NumberLong = require('mongodb').Long;
//根据商品名获取信息
router.get('/check', async (req, res) => {
    let {
        phone
    } = req.query;
    console.log('phone', NumberLong(phone));
    let result = await mongo.find(colName, { phone: NumberLong(phone) });
    console.log('result:', result);
    if (result.length) {
        // 用户已存在
        res.send(formatData({ code: 0 }));
    } else {
        // 允许注册
        console.log('222222')
        res.send(formatData());
    }
    // try {
    //     let result = await mongo.find(colName, { phone });
    //     console.log('result:', result);
    //     res.send(formatData({ data: result }));
    // } catch{
    //     console.log('BuCunZai');
    //     res.send(formatData());
    // }
})
module.exports = router;