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

export async function check_phone(datas, config = {}) {
    let { data } = await bsk.get('/reg/check', {
        params: {
            phone: datas
        }
    });
    return data;
}

export async function create_inf(datas, config = {}) {
    let { data } = await bsk.get('/create_inf/create', {
        params: {
            phone: datas.phone,
            password: datas.password
        }
    });
    return data;
}

export async function check_login(datas, config = {}) {
    let { data } = await bsk.get('/reg/check_login', {
        params: {
            logPhone: datas.logPhone,
            logPass: datas.logPass
        }
    });
    return data;
}
// 未登录前渲染本地的购物车
export async function logout_cart(datas, config = {}) {
    let { data } = await bsk.get('/logout_goods/cart', {
        params: {
            til_list: datas,
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
// 更新用户的购物车信息表
export async function update_cart(datas, config = {}) {
    let { data } = await bsk.get('/update_goods/update', {
        params: {
            phone: datas.phone,
            updateCart: datas.updateList,
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
    update_cart,
    bsk
};
// export default bsk;
