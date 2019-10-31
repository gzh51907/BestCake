import React, { Component } from "react";
import { Icon, Button, Divider } from "antd";
import { Link } from 'react-router-dom';
import './address.scss';
import createAdd from '../createAdd';
class Address extends Component {
    state = {
        addInf: [
            {
                man: '老王',
                phone: '12345678912',
                address: '北京路',
            }
        ]
    }
    goback = () => {
        this.props.history.push('/mine');
    }
    componentDidMount() {
        console.log(this.props.match.path)
    }
    render() {
        let { addInf } = this.state;
        return (
            <div className='address_style'>
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

                    <ul className='manInf'>
                        {
                            addInf.map(item => {
                                return <li key={item.phone}>
                                    <div>
                                        <span>{item.man}</span>
                                        <span>{item.phone}</span>
                                    </div>
                                    <div>{item.address}</div>
                                    <Divider />
                                    <div className='add_foot'>
                                        <p>
                                            <Icon type="check-circle" />
                                            <i>默认地址</i>
                                        </p>
                                        <div>
                                            <p>
                                                <Icon type="highlight" />
                                                <span>编辑</span>
                                            </p>
                                            <p>
                                                <Icon type="delete" />
                                                <span>删除</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>

                            })
                        }
                    </ul>

                    <div style={{
                        width: '90%',
                        left: '5%',
                        right: '5%',
                        position: 'absolute',
                        bottom: '5%',
                        boxSizing: 'border-box'
                    }}>
                        <Button
                            type="primary" block
                            style={{
                                width: '100%',
                                height: 45,
                                fontSize: 16,
                                color: '#fff'
                            }}>

                            <Link to={{ pathname: '/newAddress' }} >新增地址</Link>
                        </Button>

                    </div>
                </div>
            </div>
        )
    }
}
export default Address;