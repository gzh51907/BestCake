const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'orders';//当前路由所操作的集合为listpages
const {formatData} = require('../utlis');//引入数据响应格式

//添加订单信息
router.post('/add',async(req,res)=>{
   let{
       order
   } = req.body;
    try{
          let result = await mongo.create(colName,[order]);
          res.send(formatData({}));
    }catch{
           res.send(formatData({code:0}));
    }
})
//获取所有订单信息
router.get('/odlist',async(req,res)=>{
    try{
     let result = await mongo.find(colName);
     res.send(formatData({data:result}))
    }catch{
      res.send(formatData({code:0}))
    }
})
//删除某个订单
router.get('/delodlist',async(req,res)=>{
    let{
        id
    } = req.query;
    try{
         let result = await mongo.remove(colName,{_id:id})
         res.send(formatData({}))
    }catch{
          res.send(formatData({code:0}))
    }
})
module.exports = router;