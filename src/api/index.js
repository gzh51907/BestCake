import axios from 'axios';
let bsk = axios.create({
    baseURL:'http://localhost:20124'
})

export async function get_homedata(params,config={}){
    let {data} = await bsk.get('/home/inf');
    return data;
} 

export async function get_detaildata(datas,config={}){
    let {data} = await bsk.get('/detail_inf/detail',{
        params:{
            Name:datas
        }
    });
    return data;
}
export async function get_detailall(datas,config={}){
    let {data} = await bsk.get('/detail_inf/allgoods');
    return data;
}

export async function delete_goods(ID,config={}){
    console.log(ID)
    let {data} = await bsk.get('/detail_inf/delete',{
        params:{
            ID
        }
    });
    return data;
}
export async function update_goods(datas,config={}){
    console.log(datas)
    let {data} = await bsk.get('/detail_inf/update',{
        params:{
            Img:datas.Img,
            updatedata:datas.updatedata
        }
    });
    return data;
}
export default {
    get_homedata,
    get_detaildata,
    get_detailall,
    delete_goods,
    update_goods,
    bsk
};
// export default bsk;