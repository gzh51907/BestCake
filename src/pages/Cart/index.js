import React, { Component } from "react";
import { Checkbox, InputNumber, Button } from "antd";
import 'antd/dist/antd.css';
import './Cart.scss';
import MyContext from '../../context';
import Recommend from '../../components/recommend/index';

class App extends Component {
    state = {
        // checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: true,
        plainOptions: ['Apple', 'Apple', 'Apple'],
        defaultCheckedList: ['Apple', 'Apple', 'Apple'],
        totalPrice: '1111.00',
        datalist: [
            {
                title: '一见倾心',
                image: '../../../assest/makalong.png',
                weight: '300g',
                promotion_price: '88.00',
                price: '198.00',
                type: '爆款直降'
            },
            {
                title: '马卡龙の吻',
                image: '../../../assest/makalong.png',
                weight: '300g',
                promotion_price: '88.00',
                price: '198.00',
                type: '爆款直降'
            }, {
                title: 'Wishing Angel',
                image: '../../../assest/makalong.png',
                weight: '300g',
                promotion_price: '88.00',
                price: '198.00',
                type: '爆款直降'
            },
        ]
    };

    onChange = (e) => {
        let { indeterminate, defaultCheckedList, plainOptions } = this.state;
        if (defaultCheckedList.length === 3) {
            this.setState({
                indeterminate: true,
            })
        } else {
            this.setState({
                indeterminate: false,
            })
        }
        if (e.target.checked && defaultCheckedList.length < 3) {
            defaultCheckedList.unshift('Apple');
        } else {
            defaultCheckedList.shift();
        }
        console.log('e', e.target.checked);
    };

    onCheckAllChange = e => {
        let { plainOptions, defaultCheckedList, checkAll } = this.state;

        // if (e.target.checked) {

        // }
        this.setState({
            defaultCheckedList: !e.target.checked ? plainOptions : [],
            // indeterminate: false,
            checkAll: e.target.checked,
        });
        console.log(defaultCheckedList, plainOptions);
        console.log(`checked = ${e.target.checked}`, `checkAll = ${checkAll}`);
    };
    render() {
        let { datalist, totalPrice, indeterminate, checkAll } = this.state;
        return (
            <div className="cart">
                <div>
                    {
                        datalist.map(item => {
                            return <dl className="goods" key={item.title}>
                                <dt className="goodsItem" >
                                    <Checkbox
                                        // value={this.state.checkedList}
                                        onChange={this.onChange}
                                        checked={indeterminate}
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
                                        <InputNumber min={1} max={10} defaultValue={3} />
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
                        // indeterminate={this.state.indeterminate}
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