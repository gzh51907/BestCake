import axios from 'axios';
let bsk = axios.create({
    baseURL: 'http://localhost:20124'
})

export async function get_homedata(params, config = {}) {
    let { data } = await bsk.get('/home/inf');
    return data;
}

export async function get_detaildata(datas, config = {}) {
    let { data } = await bsk.get('/detail_inf/detail', {
        params: {
            Name: datas
        }
    });
    return data;
}
// 登录后查找改用户的购物车信息表
export async function login_cart(datas, config = {}) {
    let { data } = await bsk.get('/login_goods/cart', {
        params: {
            user_phone: datas,
        }
    });
    return data;
}

export default {
    get_homedata,
    get_detaildata,
    check_phone,
    create_inf,
    check_login,
    logout_cart,
    login_cart,
    bsk
};
// export default bsk;