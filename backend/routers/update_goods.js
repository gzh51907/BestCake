const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'usergoods';//当前路由所操作的集合为listpages
const { formatData } = require('../utlis');//引入数据响应格式
//未登录查询商品信息
router.get('/update', async (req, res) => {
    let {
        phone,
        updateCart
    } = req.query;
    let arr = [];
    updateCart.forEach(item => {
        arr.push(JSON.parse(item));
    })
    // console.log("arr", arr)
    let result = await mongo.update(colName, { phone }, { cartinf: arr });
    // console.log('result:', result);
    if (result) {
        res.send(formatData());
    } else {
        // 没找到
        res.send(formatData({ code: 0 }));
    }
})


module.exports = router;