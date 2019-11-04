import { createStore } from "redux";
let State = {
    Cart: [
        {
            name: '一见倾心',
            num: 3
        },
        {
            name: '白色红丝绒',
            num: 2
        }
    ],
    acount: '12345678912'
}
function reducer(state = State, { type, payload }) {
    switch (type) {
        case 'ADD_TO_CART': {//payload传新的商品名和数量过来添加
            return {
                ...state,
                Cart: [payload, ...state.Cart]
            }
        }
        case 'REMOVE_CART': {//payload传商品名过来删除
            return {
                ...state,
                Cart: state.Cart.filter(item => { return item.name != payload })
            }
        }
        case 'CHANGE_QTY': {//payload传商品名和新的数量过来，更新该商品的数量
            return {
                ...state,
                Cart: state.Cart.map(item => {
                    if (item.name == payload.name) {
                        item.num = item.num + payload.num
                    }
                    return item
                })
            }
        }
        case 'CLEAR_CART': {//直接清空
            return {
                ...state,
                Cart: []
            }
        }
        case'ALL_CART':{//替换整个购物车
            return{
                Cart:payload
            }
        }
        case 'get': {
            return state;
        }
        default: {//返回整个state
            return state;
        }
    }
}
const store = createStore(reducer);
export default store;