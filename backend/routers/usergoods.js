const express = require('express');
const router = express.Router();
const mongo = require('../db');
let colName = 'usergoods';
const {formatData} = require('../utlis');
//获取所有的用户购物车信息
router.get('/all',async(req,res)=>{
    try{
      let result = await mongo.find(colName);
      res.send(formatData({data:result}))
    }catch{
    res.send(formatData({code:0}))
    }
})
//获取某个用户的购物车信息
router.get('/user',async(req,res)=>{
  let{
    phone
  } = req.query
  console.log(phone);
  try{
      let result = await mongo.find(colName,{phone});
      res.send(formatData({data:result}))
  }catch{
      res.send(formatData({code:0}))
  }
})
module.exports = router;