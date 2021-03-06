import React, { Component } from "react";
import { Icon } from "antd";
class Voucher extends Component {
    goback = () => {
        this.props.history.push('/mine/minehome');
    }
    render() {
        return (
            <div>
                <div style={{
                    width: '100%',
                    backgroundColor: '#ccc',
                    height: 40,
                    paddingLeft: 20,
                    fontSize: 25,
                    boxSizing: "border-box"
                }}>
                    <Icon type="left" onClick={this.goback} />
                </div>
                <h3 style={{ width: '100%', textAlign: 'center', marginTop: 50 }}>无可用兑换券</h3>
            </div>
        )
    }
}
export default Voucher;