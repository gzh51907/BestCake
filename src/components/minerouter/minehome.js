import React, { Component } from "react";
import { Icon, Divider, Drawer, Button, Form, Input } from "antd";
import '../../pages/Mine/Mine.scss';
import 'antd/dist/antd.css';

class Mine extends Component {
    state = {
        isok:true,
        phone: '12345678912',
        visible: false,
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
    componentDidMount() {
        console.log(this.props);
        let { phone } = this.state;
        let head = phone.substring(0, 3);
        let foot = phone.substring(7);
        phone = `${head}****${foot}`;
        this.setState({
            phone
        })
    }
    goto = (path) => {
        let { history, match } = this.props;
        console.log(this.props);
        console.log(path);
        // history.push(path);
        history.push('/mine' + path);
    }
    // 登录框---------------------
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    //  登录与注册
    changeIsok=()=>{
        let {isok} = this.state;
        this.setState({
            isok:!isok
        })
    }

    render() {
        let { phone, menu,isok } = this.state;
        return (
            <div className="mine">
                <header>
                    <img src='../../assest/touxiang.jpg' onClick={this.goto.bind(this, '/userinf')} />
                    <h6>{phone}</h6>
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
                {/* 登录框 */}
                <div className="login">
                    <Button type="primary" onClick={this.showDrawer}>
                        Open
                    </Button>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width={'100%'}
                        drawerStyle={{ backgroundColor: 'rgb(54,209,220)' }}
                    >
                        <div onClick={this.onClose}>
                            <Icon type="left" style={{ color: "#fff" }} />
                        </div>
                        {/* 注册 */}
                        <div className="reg" style={isok?{display:'block'}:{display:'none'}}>
                            <h2>快速登录</h2>
                            <h6>手机号</h6>
                            <div className="reg_inf">
                                <input />
                                <span>发送验证码</span>
                            </div>
                            <p>温馨提示：未注册的手机号，登录时将自动注册，且代表您已同意<b>《贝思客用户协议》</b></p>
                            <div>
                                <Button type="primary" size='large' shape="round" onClick={this.changeIsok}>
                                    使用密码登录
                            </Button>
                            </div>
                        </div>
                        {/* 登录 */}
                        <div className="login" style={!isok?{display:'block'}:{display:'none'}}>
                            <h2>密码登录</h2>
                            <h6>手机号</h6>
                            <div className="login_inf">
                                <input />
                                <span>发送验证码</span>
                            </div>
                            <h6>密码</h6>
                            <div className="login_inf">
                                <input />
                                <span>发送验证码</span>
                            </div>
                            <div className="btn_ground">
                                <Button type="primary" size='large' shape="round" onClick={this.changeIsok}>
                                    切换快速登录
                                </Button>
                                <div>
                                    <Icon type="right" width='40px' height='40px' fill='#ccc' />
                                </div>
                            </div>
                        </div>
                    </Drawer>
                </div>
            </div>
        )
    }
}

export default Mine;