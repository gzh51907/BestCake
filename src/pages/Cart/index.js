import React, { Component } from "react";
import { Checkbox, InputNumber, Button } from "antd";
import 'antd/dist/antd.css';
import './Cart.scss';
import MyContext from '../../context';
import Recommend from '../../components/recommend/index';
import Api from '../../api';
import { connect } from 'react-redux';

let plainOptions = [];//全选的初始化
let defaultCheckedList = [];//默认选中的初始化
const mapStateToProps = (data) => ({
    cart: data.Cart,
    data: data
})
const mapDispathToProps = dispatch => {
    return {
        loginCart(payload) {
            dispatch({ type: 'CHANGE_CART', payload })
        },
        updateQty(payload) {
            dispatch({ type: 'CHANGE_QTYS', payload })
        },
        dispatch
    }
}
@connect(mapStateToProps, mapDispathToProps)
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkAll: true,
            sumList: [],
            checkedList: defaultCheckedList,
            totalPrice: '0.00',
            dataList: [],
        };
    }

    //反选
    onChange = (title, e) => {
        if (e.target.checked && !defaultCheckedList.includes(title)) {
            defaultCheckedList.push(title);
        }
        else if (!e.target.checked) {
            defaultCheckedList = defaultCheckedList.filter(item => item !== title);
        }

        this.setState({
            defaultCheckedList,
            checkAll: defaultCheckedList.length === plainOptions.length ? true : false
        });
        this.changeSum();
    };
    //全选
    onCheckAllChange = e => {
        let { checkAll } = this.state;
        defaultCheckedList = e.target.checked ? plainOptions : [];
        this.setState({
            checkAll: e.target.checked,
        });
        this.changeSum();
    };
    //改数量
    changeQty = (name, qty) => {
        let phone_res = localStorage.getItem("phone");
        let newGoods = [];
        let obj = {};
        console.log('11111', name, qty);
        // ------------------未登录前------------------
        if (!phone_res) {
            let { dataList } = this.state;
            dataList.forEach(item => {
                // console.log(item);
                if (item.Name === name) {
                    item.qty = qty
                }
                obj.title = item.Name
                obj.qty = item.qty
                newGoods.push(obj)
                obj = {}
            })
            // console.log('newGoods', JSON.stringify(newGoods));
            localStorage.setItem("usergoods", JSON.stringify(newGoods));
            this.setState({
                dataList
            })
        } else {
            // ---------------登录后--------------
            // 把商品名字和数量传过去
            let payload = {};
            payload.Name = name;
            payload.qty = 1;
            console.log("pay", payload, 'qty', qty)
            this.props.updateQty(payload);
            console.log("now", this.props.cart)
        }

        this.changeSum();

    }
    async componentDidMount() {
        let { dataList } = this.state;
        let arr = [];
        // 未登录前，查询stroage的信息发送请求数据渲染购物车
        let user_res = localStorage.getItem("usergoods");
        let phone_res = localStorage.getItem("phone");
        let til_list = [];
        let obj = {};
        // ------------------------------------未登录购物车--------------------------
        if (!phone_res) {
            let res = JSON.parse(user_res);
            res.forEach(item => {
                // 整理Name发送请求
                obj.Name = item.title
                til_list.push(obj);
                obj = {};
            })
            // 把本地storage的商品信息请求回来
            let response = await Api.logout_cart(JSON.stringify(til_list));
            // console.log('req', response);
            dataList = response.data;
            // 整理Name的qty数量,拼接到请求回来的商品dataList中
            res.forEach(item => {
                // console.log('qty', item.qty);
                dataList.map(itemd => {
                    if (item.title === itemd.Name) {
                        itemd.qty = item.qty
                    }
                })
            })
            this.setState({
                dataList
            })
            //渲染dataList的Name来实现
            dataList.map(item => {
                arr.push(item.Name);
            })
            defaultCheckedList = plainOptions = arr;
            this.changeSum();

        } else {
            // ----------------------------登录后购物车----------------------------------------
            // 获取stroage中登录用户的用户名去查找改用户的数据库购物车表
            let obj = {};
            let name_list = [];// 用于存合并
            let store_list = [];// 用于存到仓库的
            let axios_list = [];// 用于存到仓库的
            // 发起请求()
            let goodsinf = await Api.login_cart(JSON.stringify(phone_res));
            // console.log('goodsinf', goodsinf);
            let inf = {};
            goodsinf.forEach(item => {
                if (item.phone === phone_res) {
                    inf = item.cartinf;
                }
            })
            inf.forEach(item => {
                // 整理Name发送请求
                obj.Name = item.Name;
                obj.qty = item.qty;
                name_list.push(obj);
                obj = {};
            })
            // 合并用户的购物车表信息与本地浏览存储的商品信息
            user_res = JSON.parse(user_res)
            // console.log('stroage的', user_res);
            if (user_res.length > name_list.length) {
                user_res.forEach(uitem => {
                    name_list.forEach(nitem => {
                        if (uitem.title === nitem.Name) {
                            uitem.qty = uitem.qty * 1 + nitem.qty * 1
                        }
                    })
                })
                // 改键名
                let obj = {};
                user_res.forEach(item => {
                    obj.Name = item.title;
                    obj.qty = item.qty;
                    store_list.push(obj);
                    obj = {}
                })
            } else {
                name_list.forEach(nitem => {
                    user_res.forEach(uitem => {
                        if (uitem.title === nitem.Name) {
                            nitem.qty = uitem.qty * 1 + nitem.qty * 1
                        }
                    })
                })
                store_list = name_list;
            }
            // 把整理好的数据存到仓库store
            this.props.loginCart(store_list);
            // 根据仓库的信息渲染购物车
            //  处理格式（获取名字，查询数据库）
            let storeObj = {};
            this.props.cart[0].forEach(item => {
                storeObj.Name = item.Name;
                axios_list.push(storeObj);
                storeObj = {}
            })
            let response = await Api.logout_cart(JSON.stringify(axios_list));
            // console.log('cart', this.props.cart);
            dataList = response.data;
            // 整理Name的qty数量,拼接到请求回来的商品dataList中
            store_list.forEach(item => {
                dataList.map(itemd => {
                    if (item.Name === itemd.Name) {
                        itemd.qty = item.qty
                    }
                })
            })
            this.setState({
                dataList
            })
            console.log("data", dataList)
            //渲染dataList的Name来实现
            dataList.map(item => {
                arr.push(item.Name);
            })
            defaultCheckedList = plainOptions = arr;
            this.changeSum();
        }

    }
    changeSum() {
        let { sumList, dataList } = this.state;
        let phone_res = localStorage.getItem("phone");
        // ----------登录前--------------
        if (!phone_res) {
            sumList = [];
            dataList.forEach(item => {
                defaultCheckedList.forEach(deitem => {
                    if (item.Name === deitem) {
                        sumList.push(item)
                    }
                })
            })
            this.setState({
                sumList
            })
            console.log('sumList', sumList)
            //总计
            this.setState({
                totalPrice: sumList.reduce((prev, item) => prev + item.CurrentPrice * item.qty, 0)
            })

        } else {
            // ----------登录后--------------
            //获取仓库的数据计算总价
            console.log("sum", this.props.cart)
            this.setState({
                totalPrice: dataList.reduce((prev, item) => prev + item.CurrentPrice * item.qty, 0)
            })
        }
    }

    render() {
        let { dataList, totalPrice, checkAll } = this.state;
        return (
            <div className="cart">
                <div>
                    {
                        dataList.map(item => {
                            return <dl className="goods" key={item.Name}>
                                <dt className="goodsItem" >
                                    <Checkbox
                                        onChange={this.onChange.bind(this, item.Name)}
                                        checked={defaultCheckedList.indexOf(item.Name) > -1 ? true : false}
                                    ></Checkbox>
                                    <img src={item.imgurl} />
                                    <p>
                                        <i className="title">{item.Name}</i>
                                        <em>{item.LabelText}</em>
                                        <span className="price">
                                            <b>{item.CurrentPrice}</b>
                                            <del>{item.CurrentPrice * 1.5}</del>
                                        </span>
                                    </p>
                                    <div className="inputNum">
                                        <InputNumber
                                            min={1}
                                            max={50}
                                            defaultValue={item.qty}
                                            onChange={this.changeQty.bind(this, item.Name)}
                                        />
                                    </div>
                                </dt>
                                <dd>
                                    <b>优惠方式</b>
                                    <span>爆款直降</span>
                                </dd>
                            </dl>
                        })
                    }
                </div>

                <MyContext.Provider>
                    <Recommend></Recommend>
                </MyContext.Provider>

                <div className="total">
                    <Checkbox
                        // indeterminate={indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={checkAll}
                    >全选
                    </Checkbox>
                    <span>清空</span>
                    <p className="sum">
                        <span>合计：</span>
                        <b>{totalPrice}</b>
                    </p>
                    <Button type="primary">结算</Button>
                </div>
            </div>
        )
    }
}

// Recommend.contextType = MyContext;

export default App;