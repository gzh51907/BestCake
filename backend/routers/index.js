const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-Width");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");
    if (req.method == "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
})
//引入路由
const listrouter = require('./listpages');//引入listpages路由

router.use(express.urlencoded({//处理静态资源
    extended:true
}),express.json())
//使用路由
router.use('/listpages',listrouter);//使用listpages路由

module.exports = router;//导出路由
