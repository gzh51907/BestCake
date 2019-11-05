import React, { Component } from "react";
import { Checkbox, InputNumber, Button } from "antd";
import Navbar from '@/components/navbar';
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
        defaultCheckedList = e.target.checked ? plainOptions : [];
        this.setState({
            checkAll: e.target.checked,
        });
        this.changeSum();
    };
    //改数量
    changeQty = async (name, qty) => {
        let phone_res = localStorage.getItem("phone");
        let newGoods = [];
        let obj = {};
        let { dataList } = this.state;
        // console.log('data:', dataList);
        if (!phone_res) {
            dataList.forEach(item => {
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
        } else {
            dataList.forEach(item => {
                if (item.Name === name) {
                    item.qty = qty
                }
                obj.title = item.Name
                obj.qty = item.qty
                newGoods.push(obj)
                obj = {}
            })
            localStorage.setItem("sumgoods", JSON.stringify(newGoods));
        }
        this.setState({
            dataList
        })
        this.changeSum();
        // 更新数据库
        let updateList = [];
        let updateObj = {};
        dataList.forEach(item => {
            updateObj.Name = item.Name;
            updateObj.qty = item.qty;
            updateList.push(updateObj);
            updateObj = {}
        })
        // console.log("dataList",dataList);
        // console.log("updateList",updateList);
        let result = await Api.update_cart({
            phone: phone_res,
            updateList
        });
        console.log(result);
    }

    async componentDidMount() {
        let { dataList } = this.state;
        let arr = [];
        // 未登录前，查询stroage的信息发送请求数据渲染购物车
        let user_res = localStorage.getItem("usergoods");
        let phone_res = localStorage.getItem("phone");
        let sumgoods = localStorage.getItem("sumgoods");
        let til_list = [];
        let obj = {};
        // ------------------------------------未登录购物车--------------------------
        if (!phone_res && user_res) {
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

        } else if (phone_res) {
            // ----------------------------登录后购物车----------------------------------------
            // 获取stroage中登录用户的用户名去查找改用户的数据库购物车表
            let obj = {};
            let name_list = [];// 用于存合并
            let store_list = [];// 用于存到仓库的
            let axios_list = [];// 用于发送请求的
            let sum = []
            // 发起请求()
            let goodsinf = await Api.login_cart(JSON.stringify(phone_res));
            // console.log('goodsinf', goodsinf);
            let inf = null;
            console.log("goodsinf", goodsinf)
            goodsinf.forEach(item => {
                if (item.phone === phone_res) {
                    inf = item.cartinf;
                }
            })
            console.log("inf", inf)
            if (inf.length <= 1) {
                inf = JSON.parse(inf);
            }
            inf.forEach(item => {
                // 整理Name发送请求
                obj.Name = item.Name;
                obj.qty = item.qty;
                name_list.push(obj);
                obj = {};
            })
            // -------------不存在sumgoods----------
            if (!sumgoods) {
                // 合并用户的购物车表信息与本地浏览存储的商品信息
                user_res = JSON.parse(user_res);
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
                    // 把整理好的合并数据存到本地
                    sum = user_res;
                    store_list.forEach(sitem => {
                        sum.forEach(item => {
                            if (sitem.Name === item.title) {
                                item.qty = sitem.qty
                            }
                        })
                    })
                    localStorage.setItem("sumgoods", JSON.stringify(sum));
                } else {
                    name_list.forEach(nitem => {
                        user_res.forEach(uitem => {
                            if (uitem.title === nitem.Name) {
                                nitem.qty = uitem.qty * 1 + nitem.qty * 1
                            }
                        })
                    })
                    store_list = name_list;
                    // 把整理好的合并数据存到本地
                    let arr = [];
                    let obj = {};
                    store_list.forEach(item => {
                        obj.title = item.Name;
                        obj.qty = item.qty;
                        arr.push(obj);
                        obj = {};
                    })
                    localStorage.setItem("sumgoods", JSON.stringify(arr));
                }
                // 把整理好的数据存到仓库store
                this.props.loginCart(store_list);
                //  处理格式（获取名字，查询数据库）
                let storeObj = {};
                this.props.cart[0].forEach(item => {
                    storeObj.Name = item.Name;
                    axios_list.push(storeObj);
                    storeObj = {}
                })
                let response = await Api.logout_cart(JSON.stringify(axios_list));
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

            } else {
                //--------存在sumgoods后-----------
                // 直接把sumgoods拿出来发请求
                sumgoods = JSON.parse(sumgoods);
                let sumObj = {};
                sumgoods.forEach(item => {
                    sumObj.Name = item.title;
                    axios_list.push(sumObj);
                    sumObj = {};
                })
                let response = await Api.logout_cart(JSON.stringify(axios_list));
                dataList = response.data;
                sumgoods.forEach(item => {
                    dataList.map(itemd => {
                        if (item.title === itemd.Name) {
                            itemd.qty = item.qty
                        }
                    })
                })
                this.setState({
                    dataList
                })

            }
            //渲染dataList的Name来实现
            dataList.map(item => {
                arr.push(item.Name);
            })
            defaultCheckedList = plainOptions = arr;
            this.changeSum();
            let updateList = [];
            let updateObj = {};
            sumgoods.forEach(item => {
                updateObj.Name = item.title;
                updateObj.qty = item.qty;
                updateList.push(updateObj);
                updateObj = {}
            })
            // 判断该用户是否有购物车信息表
            let isIn = await Api.find_user_cart(phone_res);
            if (isIn.data.length === 0) {
                //不存在
                let result = await Api.create_cart({
                    phone: phone_res,
                    updateList
                });
            } else {
                let result = await Api.update_cart({
                    phone: phone_res,
                    updateList
                });
            }
            // console.log("isIN", isIn);
        }

    }
    //总计
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
            //总计
            this.setState({
                totalPrice: sumList.reduce((prev, item) => prev + item.CurrentPrice * item.qty, 0)
            })

        } else {
            // ----------登录后--------------
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
            this.setState({
                totalPrice: sumList.reduce((prev, item) => prev + item.CurrentPrice * item.qty, 0)
            })
        }
    }
    // 清空购物车
    clearCart = async () => {
        let { dataList } = this.state;
        let phone_res = localStorage.getItem("phone");
        let newArr = [];
        let stArr = [];
        defaultCheckedList.forEach(item => {
            dataList.filter(itemd => {
                if (item === itemd.Name) {
                    newArr.push(itemd)
                }
            })
        })
        console.log("newArr", newArr);
        dataList = newArr;
        this.setState({
            dataList
        })
        console.log("111111", dataList);
        let cartArr = [];
        let obj = {};
        dataList.forEach(item => {
            obj.Name = item.Name;
            obj.qty = item.qty;
            cartArr.push(obj);
            obj = {}
        })
        dataList.forEach(item => {
            obj.title = item.Name;
            obj.qty = item.qty;
            stArr.push(obj);
            obj = {}
        })
        console.log("cartArr", cartArr)
        // 清除数据库
        let result = await Api.update_cart({
            phone: phone_res,
            updateList: cartArr
        });
        // 清除本地stroage
        localStorage.setItem("sumgoods", JSON.stringify(stArr));
        localStorage.removeItem('usergoods');
        console.log('result', result)
    }
    // 点击结算跳转到order
    goto = () => {
        let { history } = this.props;
        history.push('/order');
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
                    <span onClick={this.clearCart}>清空</span>
                    <p className="sum">
                        <span>合计：</span>
                        <b>{totalPrice}</b>
                    </p>
                    <Button type="primary" onClick={this.goto}>结算</Button>
                </div>
                <Navbar></Navbar>
            </div>
        )
    }
}

// Recommend.contextType = MyContext;

export default App;