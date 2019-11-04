const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'listpages';//当前路由所操作的集合为listpages
const {formatData} = require('../utlis');//引入数据响应格式

//获取所有商品数据
router.get('/allgoods',async (req,res)=>{
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

//根据ID删除对应商品
router.get('/delete',(req,res)=>{
    let{
        ID
    }=req.query;

    console.log(ID)
    try{
        // mongo.remove(colName,[{'ID':752}]);
        mongo.remove(colName,[{'Name':ID}]);
        res.send(formatData())
    }catch{
        res.send(formatData({code:0}));
    }
    })

//根据img修改订单信息
router.get('/update',async (req,res)=>{
    let{
        Img,//
        updatedata,//修改的信息 对象
    }=req.query;
    console.log(req.query)
    updatedata= JSON.parse(updatedata);
    console.log(updatedata)
    try{
        mongo.update(colName,{imgurl:Img},updatedata);
        res.send(formatData())
    }catch{
        res.send(formatData({code:0}))
    }
})
// //增加订单
// router.post('/pay',async (req,res)=>{
//     let{
//     name,
//     phonenumber,
//     email,
//     serveshop,
//     price
//     } = req.body;
//     let result;
//     try{
//         let date = new Date()
//         await mongo.create(colName,[
//             {
//                 name,
//                 phonenumber,
//                 email,
//                 serveshop,
//                 price,
//                 ordertime:date.toLocaleDateString()+" "+date.toLocaleTimeString()
//             }
//         ])
//         result = formatData();
//     }catch(err){
//         result = formatData({
//             code:0
//         })
//     }
//     res.send(result)
// })




module.exports = router;