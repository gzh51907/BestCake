import React, { Component } from "react";
import { Icon, Divider } from "antd";
import '../../pages/Mine/Mine.scss';
import 'antd/dist/antd.css';
class Mine extends Component {
    state = {
        account: '123456789',
        menu: [
            {
                con: '会员等级',
                num: 'V0',
                path: ''
            },
            {
                con: '吉致币',
                num: '0',
                path: '/money'
            },
            {
                con: '优惠券',
                num: '0',
                path: '/discount'
            },
            {
                con: '兑换券',
                num: '0',
                path: '/voucher'
            }
        ]
    }
    goto = (path) => {
        let { history, match } = this.props;
        console.log(this.props);
        console.log(path);
        // history.push(path);
        history.push(match.path + path);
    }
    render() {
        let { account, menu } = this.state;
        return (
            <div className="mine">
                <header>
                    <img src='../../assest/touxiang.jpg' />
                    <h6>{account}</h6>
                </header>
                <ul>
                    {
                        menu.map(item => {
                            return <li key={item.con} onClick={this.goto.bind(this, item.path)}>
                                <span>{item.con}</span>
                                <b>{item.num}</b>
                            </li>
                        })
                    }
                </ul>
                <div className="order">
                    <p>
                        <Icon type="file-text" />
                        <span>我的订单</span>
                    </p>
                    <p className="right">
                        <Icon type="right" onClick={this.goto.bind(this, '/order')} />
                    </p>
                </div>
                <Divider />
                <div className="address">
                    <p>
                        <Icon type="environment" />
                        <span>收货地址</span>
                    </p>
                    <p className="right">
                        <Icon type="right" onClick={this.goto.bind(this, '/address')} />
                    </p>
                </div>
            </div>
        )
    }
}

export default Mine;