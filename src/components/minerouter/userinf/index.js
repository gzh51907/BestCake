import React, { Component } from "react";
import { Icon, Divider, Modal, Button } from "antd";
import "./userinf.scss";
import { connect } from 'react-redux';
const mapStateToProps = (data) => ({
    acount: data.acount
})
// console.log();
@connect(mapStateToProps)
class UserInf extends Component {
    state = {
        sex: '男',
        user_visible: false
    }
    componentDidMount() {
        let { acount } = this.props;
        let phone = localStorage.getItem("phone");
        acount = phone;
        let head = acount.substring(0, 3);
        let foot = acount.substring(7);
        acount = `${head}****${foot}`;
        console.log("acount", acount, "phone", phone);
        console.log(this.props);
        // this.setState({
        //     phone
        // })
    }
    // componentWillUnmount() {
    //     this.props.acount
    // }
    // 点击出现对话框
    showModal = () => {
        this.setState({
            user_visible: true,
        });
    };
    // 确认退出登录
    handleOk = () => {
        let { history } = this.props;
        // console.log("e", e);
        localStorage.removeItem("phone");
        this.setState({
            user_visible: false,
        });
        history.push('/home');
    };
    // 取消
    handleCancel = e => {
        // console.log(e);
        this.setState({
            user_visible: false,
        });
    };

    render() {
        let { phone, sex, user_visible } = this.state;
        let { acount } = this.props;
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
                        <span>{acount}<Icon type="right" /></span>
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
                        visible={user_visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        centered
                    >
                        <p>是否退出</p>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default UserInf;