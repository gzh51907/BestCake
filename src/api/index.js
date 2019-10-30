import axios from 'axios';
let bsk = axios.create({
    baseURL:'http://localhost:20124'
})

export async function get_homedata(params,config={}){
    let {data} = await bsk.get('/home/inf');
    return data;
}
export default {
    get_homedata
};