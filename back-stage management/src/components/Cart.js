import React, { Component } from 'react';
import { Table,Tag } from 'antd';
import API from '../api';
const {bsk} = API;
class Cart extends Component{
    constructor(){
        super();
    this.state={
        pagination:{
       pageSize:5,//每页条数
        },
        cartlist:[],//请求回来的所有订单
        columns : [
            {
              title: '用户名',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: '购物车信息',
              key: 'cartinf',
              dataIndex: 'cartinf',
              render: cartsinf => (
                <span>
                  {cartsinf.map((item,idx) => {
                      let color = idx%2==0?'geekblue':'green'
                    return (
                      <Tag style={{width:'10vw',padding:'0',overflow:'hidden',textOverflow:'ellipsis'}} color={color} key={idx}>
                        <span>{item.qty}*{item.Name}</span>
                      </Tag>
                    );
                  })}
                </span>
              ),
            },
          ]
    },
    this.handleDelete = this.handleDelete.bind(this);
}
    async componentDidMount(){
       let {data} = await bsk.get('/cart/all')
       let cartlist =data.data.map((item,idx)=>{
           return({
               key:idx,
               phone:item.phone,
               cartinf:item.cartinf,
               _id:item._id
           })
       })
       this.setState({
           cartlist
       })
    }
    handleDelete = key => {//点击删除并确定ok，就会执行
        const cartlist = [...this.state.cartlist];
        cartlist.forEach(i=>{if(i.key==key){bsk.get('/order/delcartlist',{
          params:{
            id:i._id
          }
        })}})
        this.setState({ cartlist: cartlist.filter(item => item.key !== key) });
      };
    render(){
        let {cartlist,columns,pagination} = this.state;
        if(cartlist.length==0){
            return(<>请稍等!正在等待数据请求...</>)
        }else{
            return(
                <div style={{padding:'1vw',height:'100%'}}><Table style={{height:'100%'}} onChange={this.handleTableChange} pagination={pagination} columns={columns} dataSource={cartlist} /></div>
            )
        }
    }
}
export default Cart;