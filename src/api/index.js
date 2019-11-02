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

export default {
    get_homedata,
    get_detaildata,
    check_phone,
    create_inf,
    check_login,
    bsk
};
// export default bsk;
