import React, { Component } from 'react';
import { Menu,List,Icon } from 'antd';
import API from '../api';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
const {bsk} = API;
const mapStateToProps=(state)=>{
  return{
      cart:state.Cart
  }
}
const mapDispatchProps=(dispatch)=>{
    return{
        ADD_TO_CART:({name,num})=>{dispatch({type:'ADD_TO_CART',payload:{name,num}})},//payload传新的商品名name和数量num过来添加
        CHANGE_QTY:({name,num})=>{dispatch({type:'CHANGE_QTY',payload:{name,num}})},//payload传商品名name和新的数量num过来，更新该商品的数量
        dispatch//可自定义action或什么不传获取全部Cart
    }
}
@connect(mapStateToProps,mapDispatchProps)
@withRouter
class Zy extends Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.AddToCart=this.AddToCart.bind(this);
        this.godetail = this.godetail.bind(this);
    }
    state={
        datalist:[[],[],[]],
        current:0
    }
    async componentDidMount(){
        let {data} =await bsk.get('/listpages/all')
        let datalist = this.state.datalist;
        data.data.forEach(item=>{
           if(item.classtitle=='女神'){
            datalist[0].push(item)
           }else if(item.classtitle=='经典'){
            datalist[1].push(item)
           }else if(item.classtitle=='伴手礼'){
            datalist[2].push(item)
           }
        })
        this.setState({
            datalist,
            current:0
        })
      }
      handleClick(e){
        let {current} = this.state;
        current = e.key;
        this.setState({
            current
        })
      }
      godetail(name){
         this.props.history.push({
             pathname:'/detail',
             query:name
         })
      }
      AddToCart=({name,num},event)=>{
          event.stopPropagation();
          let props =this.props;
          let isok = false;
          let cart =props.cart
          let index;
          cart.forEach((i,idx)=>{//如果仓库购物车已存在就增加数量
              if(i.name==name){ isok=true,index=idx}
          })
          if(isok){//如果仓库购物车已存在就增加数量
            props.CHANGE_QTY({name,num})//改变仓库购物车
         }
         else{props.ADD_TO_CART({name,num})}
          if(localStorage.getItem('phone')){//有登陆，就更新数据库
            let cartinf = props.cart.map((item,idx)=>{//处理传给数据库的数据格式
                if(isok){//已存在商品
                    if(idx==index){//找到存在的商品加1
                        return{
                            Name:item.name,
                            qty:item.num+1
                        }
                    }else{
                        return {
                            Name:item.name,
                            qty:item.num
                        }
                    }
                }else{//不存在该商品，直接返回
                    return {
                        Name:item.name,
                        qty:item.num
                    }
                }
            })
            if(!isok){//如果不存在
            cartinf.push({Name:name,qty:num})
            }
            bsk.get('/cart/update',{//更新数据库的用户购物车
                params:{
                    phone:localStorage.getItem('phone'),
                    cartinf:JSON.stringify(cartinf)
                }
            })
          }else{//没登录就更新浏览器的storage
             let loaclcart = localStorage.getItem('usergoods');
             loaclcart.forEach((i,idx)=>{
                 if(i.title==name){//浏览器缓存已存在该商品，就增加数量
                    loaclcart[idx].qty=loaclcart[idx].qty+1;
                 }else{//没有改商品就添加
                     loaclcart.push({title:name,qty:num})
                 }
             })
          }
      }
    render(){
        let{datalist,current} = this.state
        if(datalist[0].length){//数据请求回来才渲染
            return(<>
                <Menu style={{paddingLeft:'20vw'}} onClick={this.handleClick} selectedKeys={[current+'']} mode="horizontal">
                    {
                       datalist.map((item,idx)=>{
                           return(<Menu.Item key={idx+''} style={{width:'20vw'}}>
                               {
                                   item[0].classtitle
                               }
                           </Menu.Item>)
                       })
                    }
               </Menu>
               <List
                    grid={{ xs:2,sm:2 }}
                    dataSource={datalist[current]}
                    renderItem={item => (
                    <List.Item onClick={this.godetail.bind(this,item.Name)} style={{width:'50vw',paddingLeft:'2vw'}}>
                        <img src={item.imgurl} style={{width:'100%',height:'44vw'}}/>
                        <div style={{fontSize:'3.734vw',color:'#333',marginTop:'1.867vw',lineHeight:'3.734vw'}}>{item.Name}</div>
                        <div style={{fontSize:'3.2vw',color:'#999',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{item.Means}</div>
                        <div>
                            <span  style={{fontSize:'3.2vw',color:'rgb(255, 51, 0)'}}>￥</span>
                            <span style={{fontSize:'4.267vw',color:'rgb(255, 51, 0)'}}>{item.CurrentPrice}</span>
                            <span style={{fontSize:'3.2vw',color:'rgb(153, 153, 153)',marginLeft:'1.067vw'}}>/{item.Size}</span>
                            <Icon 
                            style={{float:'right', width:'5.334vw', fontSize:'5.334vw',color:'#00CCCC',marginRight:'2vw'}} 
                            type="shopping-cart"
                            onClick={this.AddToCart.bind(this,{name:item.Name,num:1})}
                             />
                        </div>
                </List.Item>
    )}
  />
               </>)
        }else{
            return(<>loading</>)
        }
       
    }
}
export default Zy;