import React, { Component } from 'react';
import Api from '../api';
import { Table, Tag ,Popconfirm} from 'antd';
let{bsk} = Api;
class Order extends Component{
    constructor(){
        super();
    this.state={
        pagination:{
       pageSize:5,//每页条数
        },
        odlist:[],//请求回来的所有订单
        columns : [
            {
              title: '用户名',
              dataIndex: 'name',
              key: 'name',
            //   render: text => <a>{text}</a>,
            },
            {
              title:'联系电话',
              dataIndex:'phone',
              key:'phone'
            },
            {
                title:'留言',
                dataIndex:'message',
                key:'message'
            },
            {
                title:'地址',
                dataIndex:'adress',
                key:'adress'
            },
            {
              title: '所订商品',
              key: 'goodsinf',
              dataIndex: 'goodsinf',
              render: goodsinf => (
                <span>
                  {goodsinf.map((item,idx) => {
                      let color = idx%2==0?'geekblue':'green'
                    return (
                      <Tag style={{width:'10vw',padding:'0',overflow:'hidden',textOverflow:'ellipsis'}} color={color} key={idx}>
                        <img style={{width:'3vw'}}  src={item.imgurl}/>
                        <span>{item.num}*{item.Name}/{item.Size}</span>
                      </Tag>
                    );
                  })}
                </span>
              ),
            },
            {
                title:'价格',
                dataIndex:'totalprice',
                key:'totalprice'
            },
            {
              title: '操作',
              key: 'action',
              render: (text,record)=>{
                  return(   <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <a>Delete</a>
                </Popconfirm>)
              }
              
            },
          ]
    },
    this.handleDelete = this.handleDelete.bind(this);
}
    async componentDidMount(){
       let {data} = await bsk.get('/order/odlist')
       console.log(data.data)
       let odlist =data.data.map((item,idx)=>{
           return({
               key:idx,
               name:item.userinf.name,
               phone:item.userinf.phone,
               message:item.message?item.message:'无留言',
               adress:item.userinf.adress,
               goodsinf:item.goodsinf,
               totalprice:item.totalprice,
               _id:item._id
           })
       })
       console.log(odlist)
       this.setState({
           odlist
       })
    }
    handleDelete = key => {//点击删除并确定ok，就会执行
        const odlist = [...this.state.odlist];
        odlist.forEach(i=>{if(i.key==key){bsk.get('/order/delodlist',{
          params:{
            id:i._id
          }
        })}})
        this.setState({ odlist: odlist.filter(item => item.key !== key) });
      };
    render(){
        let {odlist,columns,pagination} = this.state;
        if(odlist.length==0){
            return(<>请稍等!正在等待数据请求...</>)
        }else{
            return(
                <div style={{padding:'1vw',height:'100%'}}><Table style={{height:'100%'}} onChange={this.handleTableChange} pagination={pagination} columns={columns} dataSource={odlist} /></div>
            )
        }
        
    }
}
 
  
 
  
export default Order;