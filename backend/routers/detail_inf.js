const express = require('express');
const router = express.Router();
const mongo = require('../db')//引入数据库的增删改查
let colName = 'listpages';//当前路由所操作的集合为listpages
const {formatData} = require('../utlis');//引入数据响应格式
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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

    // console.log(ID)
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
    // console.log(req.query)
    // updatedata= JSON.parse(updatedata);
    // console.log(updatedata)
    try{
        mongo.update(colName,{imgurl:Img},updatedata);
        res.send(formatData())
    }catch{
        res.send(formatData({code:0}))
    }
})

//增加订单
router.get('/add',async (req,res)=>{
    let{
        Name,
        Size,
        imgurl,
        CurrentPrice,
        ID,
    } = req.query;


    let result;
    try{
        let date = new Date()
        await mongo.create(colName,[
            {
                Name,
                Size,
                imgurl,
                CurrentPrice,
                ID,
                ordertime:date.toLocaleDateString()+" "+date.toLocaleTimeString()
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

// router.get('/addgoods',async function(req,res,next){
//     let goods =JSON.parse( req.query.sizeForm);
//     let all = await mongo.find(colName,{},0,'',true);
//     goods.id = all.length;//长度加1作为id
//     try{
//         mongo.create(colName,[goods]);
//         res.send(formatData());
//     }catch{
//         res.send(formatData({code:0}))
//     }
// })
router.post('/pic_upload', multer({
    //设置文件存储路径
   dest: 'static'   //upload文件如果不存在则会自己创建一个。
}).single('file'), function (req, res, next) {
  if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
    res.render("error", {message: "上传文件不能为空！"});
    return
} else {
    let file = req.file;
    let fileInfo = {};
    fs.renameSync('./static/' + file.filename, './static/' + file.originalname);//这里修改文件名字，比较随意。
    // 获取文件信息
    fileInfo.mimetype = file.mimetype;
    fileInfo.originalname = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = file.path;
    // 设置响应类型及编码
    res.set({
    'content-type': 'application/json; charset=utf-8'
    });

    res.send(path.join(__dirname,'../static/'+fileInfo.originalname));
}
})


module.exports = router;