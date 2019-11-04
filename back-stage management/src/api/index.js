import axios from 'axios';
let bsk = axios.create({
    baseURL:'http://localhost:20124'
});


//goods information
export async function get_detailall(datas,config={}){
    let {data} = await bsk.get('/detail_inf/allgoods');
    return data;
}

export async function delete_goods(ID,config={}){
    // console.log(ID)
    let {data} = await bsk.get('/detail_inf/delete',{
        params:{
            ID
        }
    });
    return data;
}
export async function update_goods(datas,config={}){
    // console.log(datas)
    let {data} = await bsk.get('/detail_inf/update',{
        params:{
            Img:datas.Img,
            updatedata:datas.updatedata
        }
    });
    return data;
}

export async function add_goods(datas,config={}){
    console.log(datas)
    let {data} = await bsk.get('/detail_inf/add',{
        params:{
            Name:datas.Name,
            Size:datas.Size,
            imgurl:datas.imgurl,
            CurrentPrice:datas.Size,
            ID:datas.ID,
          
        }
    });
    // console.log(data)
    return data;
}

//  user informaton
export async function get_userall(datas,config={}){
    let {data} = await bsk.get('/user_inf/alluser');
    return data;
}

export async function delete_user(ID,config={}){
    console.log(ID)
    let {data} = await bsk.get('/user_inf/delete',{
        params:{
            ID
        }
    });
    return data;
}

export async function add_user(datas,config={}){
    // console.log(datas)
    let {data} = await bsk.get('/user_inf/add',{
        params:{
            phone:datas.phone,
            password:datas.password,

        }
    });
    // console.log(data)
    return data;
}

export default {
    get_detailall,
    delete_goods,
    update_goods,
    get_userall,
    delete_user,
    add_user,
    add_goods,
    bsk
};