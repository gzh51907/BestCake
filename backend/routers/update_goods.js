const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'usergoods';//当前路由所操作的集合为listpages
const { formatData } = require('../utlis');//引入数据响应格式
//查询该用户是否已有购物车表
router.get('/find', async (req, res) => {
    let {
        phone
    } = req.query;
    let result = await mongo.find(colName, { phone });
    // console.log('find_phone:', phone);
    // console.log('find_result:', result);
    if (result === []) {
        res.send(formatData({ code: 0 }));
    } else {
        // 没找到
        res.send(formatData({ data: result }));
    }
})
// 创建用户购物车表
router.get('/create', async (req, res) => {
    let {
        phone,
        updateCart
    } = req.query;
    let arr = [];
    arr.push(JSON.parse(updateCart[0]));
    let obj = {};
    obj.phone = phone;
    obj.cartinf = arr;
    let result = await mongo.create(colName, [obj]);
    if (result) {
        res.send(formatData());
    } else {
        // 没找到
        res.send(formatData({ code: 0 }));
    }
})
// 更新
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