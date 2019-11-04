const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'users';//当前路由所操作的集合为listpages
const {formatData} = require('../utlis');//引入数据响应格式

//获取所有用户数据
router.get('/alluser',async (req,res)=>{
    try{
        let result = await mongo.find(colName);
        res.send(formatData({data:result}));
    }catch{
            res.send(formatData({code:0}))
    }
})

//根据ID获取信息
router.get('/detail',async(req,res)=>{
    let{
        Name
    } = req.query;
    try{
        let result = await mongo.find(colName,{Name});
        res.send(formatData({data:result}));
    }catch{
        res.send(formatData({code:0}));
    }
})

//根据ID删除对应商品
router.get('/delete',(req,res)=>{
    let{
        ID
    }=req.query;

    console.log(ID)
    try{
        // mongo.remove(colName,[{'ID':752}]);
        mongo.remove(colName,{_id:ID});
        res.send(formatData())
    }catch{
        res.send(formatData({code:0}));
    }
    })

//根据ID修改用户信息
router.get('/update',async (req,res)=>{
    let{
        ID,//
        updatedata,//修改的信息 对象
    }=req.query;
    console.log(req.query)
    updatedata= JSON.parse(updatedata);
    // console.log(updatedata)
    try{
        mongo.update(colName,{_id:ID},updatedata);
        res.send(formatData())
    }catch{
        res.send(formatData({code:0}))
    }
})

//增加用户
router.get('/add',async (req,res)=>{
    let{
        phone,
        password
    } = req.query;
    // console.log(req.query)
    let result;
    try{
        await mongo.create(colName,[
            {
                phone,
                password
            }
        ])
        result = formatData();
    }catch(err){
        result = formatData({
            code:0
        })
    }
    res.send(result)
})

module.exports = router;