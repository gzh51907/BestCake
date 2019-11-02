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
const orderrouter = require('./order');//引入订单路由
const homerouter = require('./home');//引入homerouter路由
const detailouter = require('./detail_inf');//引入homerouter路由
const regrouter = require('./reg');//引入homerouter路由
const createrouter = require('./create_inf');//引入homerouter路由

router.use(express.urlencoded({//处理静态资源
    extended: true
}), express.json())
//使用路由
router.use('/listpages', listrouter);//使用listpages路由
router.use('/home', homerouter);//使用homerouter路由
router.use('/detail_inf', detailouter);//使用homerouter路由
router.use('/reg', regrouter);//使用homerouter路由
router.use('/order', orderrouter);//使用订单路由
router.use('/create_inf', createrouter);//使用订单路由

module.exports = router;//导出路由
