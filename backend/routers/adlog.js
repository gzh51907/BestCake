const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'resister';//当前路由所操作的集合为listpages
const {formatData} = require('../utlis');//引入数据响应格式
//查询数据库管理员信息
router.post('/log',async(req,res)=>{
   let{
       adname,
       password
   } = req.body;
    try{
          let result = await mongo.find(colName,{adname,password});
          res.send(formatData({}));
    }catch{
           res.send(formatData({code:0}));
    }
})
module.exports = router;