const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'listpages';//当前路由所操作的集合为listpages
const {formatData} = require('../utlis');//引入数据响应格式
//获取所有的listpages信息
router.get('/all',async (req,res)=>{
    try{
        let result = await mongo.find(colName);
        res.send(formatData({data:result}));
    }catch{
        
            res.send(formatData({code:0}))
    }
})
//根据商品名获取信息
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
module.exports = router;