const { MongoClient } = require('mongodb');
const { mongoname, mongourl } = require('../config.json');
//封装连接mongodb函数
async function connect() {
    let result;
    try {
        let client = await MongoClient.connect(mongourl, {//连接mongodb
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        let db = client.db(mongoname);//连接mongodb的beatcake数据库
        result = {//将两个连接口返回出去
            client,
            db
        }
    } catch (err) {//连接失败返回错误
        result = err;
    }
    return result;
}
/**
 * 增
 * colName  字符串 执行操作的集合（表）名
 * data     数组对象[{},...],要添加的数据，可多个
*/
async function create(colName, data) {
    let {
        db,
        client
    } = await connect();//开启mongo连接
    let clo = db.collection(colName);//获取对应colName的集合collection
    let result = await col.insertMany(data);//插入数据
    client.close();//关闭数据库连接
    return result;
}
/**
 * 删
 * cloName   字符串 执行操作的集合（表）名
 * query     对象[{}],传要删除的数据特征，可多个
 */
async function remove(colName, query) {
    let {
        db,
        client
    } = await connect();//连接数据库
    let col = db.collection(colName);//获取集合
    let result = await col.deleteMany({ $or: query });
    client.close();//关闭数据库
    return result;
}
/**
 * 改
 * colName 字符串 执行操作的集合名字
 * query  {},根据要修改的数据特征选中数据对象
 * data   {},修改的内容覆盖选中的对象
*/
async function update(colName, query, data) {
    let {
        db,
        client
    } = await connect()//连接数据库
    let col = db.collection(colName);//获取集合
    let result = await col.updateMany(query, { $set: data });
    client.close();
    return result;
}
/**
 * 查
 * colName   字符串  执行操作的集合名字
 * query     {},要查找的数据特征   可不写 模糊查询传入{$or:[{属性:new RegExp(正则)},...]}
 * page      number,当前页数      可不写
 * sk        number,一页数据的数量 可不写,写了page就一定要写
*/
async function find(colName, query = {}, page, sk) {
    let {
        db,
        client
    } = await connect();//连接数据库
    let result;
    let col = db.collection(colName);//获取集合
    if (page) {//如果传页数，就一定要传sk数量获取部分数据
        page = page - 1;
        result = await col.find(query).skip(sk * page - 0).limit(sk).toArray()
    } else {//否则返回全部符合query特征的数据
        result = await col.find(query).toArray();
    }
    client.close()//关闭数据库
    return result;
}
module.exports = {//导出一个对象
    create,
    remove,
    update,
    find
}