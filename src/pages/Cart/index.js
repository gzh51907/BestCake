import React, { Component } from "react";
import { Checkbox, InputNumber, Button } from "antd";
import 'antd/dist/antd.css';
import './Cart.scss';
import MyContext from '../../context';
import Recommend from '../../components/recommend/index';

let plainOptions = [];//全选的初始化
let defaultCheckedList = [];//默认选中的初始化

class App extends Component {
    state = {
        checkAll: true,
        sumList: [],
        checkedList: defaultCheckedList,
        totalPrice: '1111.00',
        datalist: [
            {
                title: '一见倾心',
                image: '../../../assest/makalong.png',
                weight: '300g',
                promotion_price: '88.00',
                price: '198.00',
                type: '爆款直降',
                qty: 5
            },
            {
                title: '马卡龙の吻',
                image: '../../../assest/makalong.png',
                weight: '1300g',
                promotion_price: '188.00',
                price: '198.00',
                type: '爆款直降',
                qty: 3
            }, {
                title: 'Wishing Angel',
                image: '../../../assest/makalong.png',
                weight: '2300g',
                promotion_price: '288.00',
                price: '198.00',
                type: '爆款直降',
                qty: 2
            },
        ]
    };
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
    };
    //改数量
    changeQty = (idTitle, qty) => {
        console.log(idTitle, qty);
        let { datalist } = this.state;
        datalist.forEach(item => {
            // console.log(item);
            if (item.title === idTitle) {
                item.qty = qty
            }
        })
        // console.log(newData);
        this.setState({
            datalist
        })
        this.changeSum()
    }
    componentDidMount() {
        let { datalist } = this.state;
        let arr = [];
        //渲染datalist的title来实现
        datalist.map(item => {
            arr.push(item.title);
        })
        defaultCheckedList = plainOptions = arr;

        this.changeSum()
    }
    changeSum() {
        let { sumList, datalist } = this.state;
        sumList = [];
        datalist.forEach(item => {
            defaultCheckedList.forEach(deitem => {
                if (item.title === deitem) {
                    sumList.push(item)
                }
            })
        })
        this.setState({
            sumList
        })
        // console.log('sumList', sumList)
        // console.log('defaultCheckedList', defaultCheckedList)
        //总计
        this.setState({
            totalPrice: sumList.reduce((prev, item) => prev + item.promotion_price * item.qty, 0)
        })
    }

    render() {
        let { datalist, totalPrice, checkAll } = this.state;
        return (
            <div className="cart">
                <div>
                    {
                        datalist.map(item => {
                            return <dl className="goods" key={item.weight}>
                                <dt className="goodsItem" >
                                    <Checkbox
                                        onChange={this.onChange.bind(this, item.title)}
                                        checked={defaultCheckedList.indexOf(item.title) > -1 ? true : false}
                                    ></Checkbox>
                                    <img src={item.image} />
                                    <p>
                                        <i className="title">{item.title}</i>
                                        <em>{item.weight}</em>
                                        <span className="price">
                                            <b>{item.promotion_price}</b>
                                            <del>{item.price}</del>
                                        </span>
                                    </p>
                                    <div className="inputNum">
                                        <InputNumber
                                            min={1}
                                            max={10}
                                            defaultValue={item.qty}
                                            onChange={this.changeQty.bind(this, item.title)}
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

                {/* <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={checkAll}
                    >
                        Check all
                    </Checkbox>
                </div>
                <br />
                <CheckboxGroup
                    options={plainOptions}
                    value={checkedList}
                    onChange={this.onChange}
                /> */}

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