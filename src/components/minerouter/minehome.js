import React, { Component } from "react";
import { Icon, Divider, Drawer, Button, Form, Input, message } from "antd";
import Navbar from '../../components/navbar';
import '../../pages/Mine/Mine.scss';
import 'antd/dist/antd.css';
import Api from '../../api';
import { connect } from 'react-redux';
// const mapStateToProps = (data) => ({
//     acount: data.acount,
//     data: data
// })
// // console.log();
// @connect(mapStateToProps)
class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isok: true,
            // phone: '12345678912',
            visible: true,//drawer
            random: '',
            show: false,
            regPhone: '',
            regCode: '',
            logPhone: '',
            logPass: '',
            regSwitch: false,
            acount: '',
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
    }

    componentDidMount() {
        // 如果已登录显示我的
        let { acount } = this.state;
        let local = localStorage.getItem('phone');
        if (local) {
            let head = local.substring(0, 3);
            let foot = local.substring(7);
            local = `${head}****${foot}`;
            acount = local;
            this.setState({
                visible: false,
                acount
            });
        } else {
            this.setState({
                visible: true,
            });
        }
        this.randomCode();
    }

    goto = (path) => {
        let { history } = this.props;
        history.push('/mine' + path);
    }
    // 登录框---------------------
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        let local = localStorage.getItem('phone');
        if (local) {
            this.setState({
                visible: false,
            });
        } else {
            history.go(-2);
        }

    };

    //  登录与注册
    changeIsok = () => {
        let { isok } = this.state;
        this.setState({
            isok: !isok
        })
    }
    //随机验证码
    randomCode = () => {
        let { random } = this.state;
        let newCode = "";
        let html =
            "0123465789zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP";
        for (let i = 0; i < 4; i++) {
            let j = parseInt(Math.random() * html.length);
            newCode += html[j];
        }
        random = newCode;
        this.setState({
            random
        })
    }
    // 显示验证码
    showCode = () => {
        let { show } = this.state;
        this.setState({
            show: true
        })
    }
    // 获取reg输入框的内容
    handleRegPhone = (e) => {
        this.setState({
            regPhone: e.target.value
        })
    }
    // 获取reg验证码的内容
    handleRegCode = (e) => {
        this.setState({
            regCode: e.target.value
        })
    }
    // 获取login电话号码的内容
    handleLogPhone = (e) => {
        this.setState({
            logPhone: e.target.value
        })
    }
    // 获取login密码的内容
    handleLogPass = (e) => {
        this.setState({
            logPass: e.target.value
        })
    }
    // 验证是否已注册
    checkPhone = async () => {
        let { regPhone } = this.state;
        let res = await Api.check_phone(regPhone)
        if (res.code === 1) {
            this.setState({
                regSwitch: true
            })
        } else if (res.code === 0) {
            this.setState({
                regSwitch: false
            })
        }
    }
    // 注册验证
    checkReg = async () => {
        let { regCode, random, regPhone, regSwitch } = this.state;
        let msg = '';
        let reg = /^1[3-9]\d{9}$/;
        let result = reg.test(regPhone);
        if (regPhone === '') {
            msg = '请输入手机号码！';
            this.error(msg);
        }
        else if (!result) {
            msg = '手机格式不正确！';
            this.error(msg);
        } else if (regCode.toLowerCase() !== random.toLocaleLowerCase()) {
            msg = '验证码不正确！';
            this.error(msg);
        } else if (regSwitch === false) {
            msg = '账号已注册，请更换！';
            this.error(msg);
        } else if (regPhone !== '' && result && regCode.toLowerCase() === random.toLocaleLowerCase() && regSwitch === true) {
            let password = regPhone.slice(5);
            let res = await Api.create_inf({
                phone: regPhone,
                password
            })
            this.setState({
                visible: false,
            })
            this.localSave(regPhone);
        }

    }
    // 错误提示信息
    error = (msg) => {
        message.error(msg);
    };
    localSave = (phone) => {
        localStorage.setItem('phone', phone);
        this.setState({
            visible: false,
        })
    }
    // 登录验证
    checkLog = async () => {
        let { logPhone, logPass } = this.state;
        let res = await Api.check_login({
            logPhone,
            logPass
        })
        if (res.code === 0) {
            let msg = "账号或密码错误！";
            this.error(msg);
        } else if (res.code === 1) {
            //登录成功,存信息至storage
            this.localSave(logPhone);
        }
    }

    render() {
        let { menu, isok, random, show, acount } = this.state;
        return (
            <div className="mine">
                <header>
                    <img src='../../assest/touxiang.jpg' onClick={this.goto.bind(this, '/userinf')} />
                    <h6>{acount}</h6>
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
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width={'100%'}
                        drawerStyle={{ backgroundColor: 'rgb(54,209,220)' }}
                    >
                        <div>
                            <Icon type="left" style={{ color: "#fff" }} onClick={this.onClose} />
                        </div>
                        {/* 注册 */}
                        <div className="reg" style={isok ? { display: 'block' } : { display: 'none' }}>
                            <h2>快速登录</h2>
                            <h6>手机号</h6>
                            <div className="reg_inf">
                                <Input onChange={this.handleRegPhone} onBlur={this.checkPhone} />
                                <span onClick={this.showCode}>发送验证码</span>
                            </div>
                            <div className="code_box" style={show ? { display: 'block' } : { display: 'none' }}>
                                <h6>验证码</h6>
                                <div className="random_code">
                                    <Input onChange={this.handleRegCode} />
                                    <span onClick={this.randomCode}>{random}</span>
                                </div>
                            </div>
                            <p>温馨提示：未注册的手机号，登录时将自动注册，且代表您已同意<b>《贝思客用户协议》</b></p>
                            <div className="btn_ground">
                                <Button type="primary" size='large' shape="round" onClick={this.changeIsok}>
                                    使用密码登录
                                </Button>
                                <div onClick={this.checkReg}>
                                    <Icon type="right" />
                                </div>
                            </div>

                        </div>
                        {/* 登录 */}
                        <div className="login" style={!isok ? { display: 'block' } : { display: 'none' }}>
                            <h2>密码登录</h2>
                            <h6>手机号</h6>
                            <div className="login_inf">
                                <Input onChange={this.handleLogPhone} />
                            </div>
                            <h6>密码</h6>
                            <div className="login_inf">
                                <Input.Password onChange={this.handleLogPass} />
                            </div>
                            <div className="btn_ground">
                                <Button type="primary" size='large' shape="round" onClick={this.changeIsok}>
                                    切换快速登录
                                </Button>
                                <div onClick={this.checkLog}>
                                    <Icon type="right" />
                                </div>
                            </div>
                        </div>

                    </Drawer>
                </div>
                <Navbar></Navbar>
            </div>
        )
    }
}

export default Mine;