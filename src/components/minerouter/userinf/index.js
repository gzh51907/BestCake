import React, { Component } from "react";
import { Icon, Divider, Modal, Button } from "antd";
import "./userinf.scss";
class UserInf extends Component {
    state = {
        phone: '12345678912',
        sex: '男',
        visible: false
    }
    componentDidMount() {
        let { phone } = this.state;
        let head = phone.substring(0, 3);
        let foot = phone.substring(7);
        phone = `${head}****${foot}`;
        this.setState({
            phone
        })
    }
    // 点击出现对话框
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    // 确认
    handleOk = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };
    // 取消
    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };

    // 退出登录
    logOut = () => {

    }
    render() {
        let { phone, sex } = this.state;
        return (
            <div className="userinf">
                <ul>
                    <li>
                        <span>头像</span>
                        <img src="../../../assest/touxiang.jpg" />
                    </li>
                    <Divider />
                    <li>
                        <span>昵称</span>
                        <span>未设置
                        <Icon type="right" />
                        </span>
                    </li>
                    <Divider />
                    <li>
                        <span>真实姓名</span>
                        <span>未设置
                        <Icon type="right" />
                        </span>
                    </li>
                    <Divider />
                    <li>
                        <span>性别</span>
                        <span>{sex}<Icon type="right" /></span>
                    </li>
                    <Divider />
                    <li>
                        <span>手机号</span>
                        <span>{phone}<Icon type="right" /></span>
                    </li>
                    <Divider />
                    <li>
                        <span>修改密码</span>
                        <span><Icon type="right" /></span>
                    </li>
                </ul>
                <div className="logout" onClick={this.showModal}>退出登录</div>
                <div>
                    <Modal
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>是否退出</p>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default UserInf;