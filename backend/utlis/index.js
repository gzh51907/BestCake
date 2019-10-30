
/**
 * code 状态码（1：成功，0：失败）
 * msg 提示信息
 * data 需要返回的数据
 */
function formatData({
    code = 1,
    msg = 'success',
    data = []
} = {}) { //如果不加={}，在调用formatData时就一定要传{}一个对象形式的参数，加了之后可不传参数

    if (code === 0) {
        msg = 'fail'
    }
    return {
        code,
        msg,
        data
    }
}
module.exports = {
    formatData
}