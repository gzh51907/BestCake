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

export default {
    get_homedata,
    get_detaildata,
    check_phone,
    bsk
};
// export default bsk;
