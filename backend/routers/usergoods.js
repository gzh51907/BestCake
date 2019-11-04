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
  try{
      let result = await mongo.find(colName,{phone});
      res.send(formatData({data:result}))
  }catch{
      res.send(formatData({code:0}))
  }
})
//更新某用户的购物车信息
router.get('/update',async(req,res)=>{
  let{
    phone,
    cartinf
  }=req.query
  console.log(11)
  console.log(cartinf)
  try{
      let result = await mongo.update(colName,{phone},{cartinf})
      res.send(formatData())
  }catch{
     res.send(formatData({code:0}))
  }
})
module.exports = router;