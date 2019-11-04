import React, { Component } from "react";
import { withState } from "../hoc";
import { Menu, Icon, Badge } from 'antd';
import { withRouter } from 'react-router-dom' //引入withRouter
import {connect} from 'react-redux';

const mapStateToProps=(state)=>{
    return{
        cartlength:state.Cart.length
    }
    }
@withRouter
// 用户获取state数据
@connect(mapStateToProps)
class Navbar extends Component {

    componentDidMount() {
        // console.log(this.props)
        let arr = document.querySelectorAll(".ant-menu-item");
        for(var i=0; i<arr.length;i++){
            arr[i].style.paddingTop="10px"
        }


    }

    render() {
        let { history } = this.props
        let { navlist, selected, cartlength } = this.props.data;
        console.log(111)
        // console.log(navlist);
        return (
            <div style={{ height: 80, lineHeight: 80 }}>
                <Menu
                    mode="horizontal"
                    selectedKeys={selected}
                    onSelect={({ key }) => {
                        history.push(key)
                        this.setState({
                            selected: [key]
                        })
                    }}
                    style={{
                        position: "fixed",
                        width: '100%', height: 80,

                        bottom: -25,
                        left: 0, right: 0
                    }}
                >
                    {
                        navlist.map(item => <Menu.Item key={item.path}
                            style={{
                                height: 80, width: '25%', textAlign: "center"
                            }}>
                            {
                                item.text === 'cart' ?
                                    <Badge count={cartlength}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column", justifyContent: "center", flex: 1, alignSelf: 'center'
                                        }}>
                                        <Icon type={item.icon} style={{ paddingLeft: 10, marginBottom: -1 }} />
                                        <span>{item.text}</span>
                                    </Badge>
                                    :
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column", justifyContent: "center", flex: 1
                                    }}>
                                        <Icon type={item.icon} style={{ paddingLeft: 10, marginBottom: -1 }} />
                                        <span >{item.text}</span>
                                    </div>
                            }
                        </Menu.Item>)
                    }
                </Menu>
            </div>
        )
    }
}
Navbar = withState(Navbar);
export default Navbar;