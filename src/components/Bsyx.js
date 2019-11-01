import React, { Component } from 'react';
import {Menu,List,Icon} from "antd";
class Bsyx extends Component{
    state={
        datalist:[{
            imgurl:'https://res.bestcake.com/m-images/ww/rp/可莱思迪客英国进口冰淇淋(125mlx4).jpg?v=14',
            Name:'可莱思迪客英国进口冰淇淋(125mlx4)',
            Means:'香草2 草莓1 巧克力1',
            CurrentPrice:'99.00',
            Size:'/ (香草×2)+巧克力+草莓'
        },
        {
            imgurl:'https://res.bestcake.com/m-images/ww/rp/可莱思迪客英国进口冰淇淋(500ml).jpg?v=14',
            Name:'可莱思迪客英国进口冰淇淋(500ml)',
            Means:'享受空杯乐趣',
            CurrentPrice:'99.00',
            Size:'/ (香草×2)+巧克力+草莓'
        },
        {
            imgurl:'https://res.bestcake.com/m-images/ww/rp/麦趣尔一号牧场纯牛奶(250ml×12).jpg?v=14',
            Name:'麦趣尔一号牧场纯牛奶(250ml×12)',
            Means:'纯天然无污染，停不下来的美味',
            CurrentPrice:'99.00',
            Size:'/ 1提装'
        },
        {
            imgurl:'https://res.bestcake.com/m-images/ww/rp/麦趣尔纯牛奶(250mlx12盒).jpg?v=14',
            Name:'麦趣尔纯牛奶(250mlx12盒)',
            Means:'-',
            CurrentPrice:'72.00',
            Size:'/ 1提装'
        }]
    }
    render(){
        let {datalist} = this.state;
        return (<>
    <Menu  selectedKeys={["milk"]} style={{textAlign:'center'}} mode="horizontal">
        <Menu.Item key="milk">
          乳品
        </Menu.Item>
        </Menu>
   <List
        grid={{ xs:2,sm:2 }}
        dataSource={datalist}
        renderItem={item => (
        <List.Item style={{width:'50vw',paddingLeft:'2vw'}}>
            <img src={item.imgurl} style={{width:'100%',height:'44vw'}}/>
            <div style={{fontSize:'3.734vw',color:'#333',marginTop:'1.867vw',lineHeight:'3.734vw'}}>{item.Name}</div>
            <div style={{fontSize:'3.2vw',color:'#999',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{item.Means}</div>
            <div>
                <span  style={{fontSize:'3.2vw',color:'rgb(255, 51, 0)'}}>￥</span>
                <span style={{fontSize:'4.267vw',color:'rgb(255, 51, 0)'}}>{item.CurrentPrice}</span>
                <span style={{fontSize:'3.2vw',color:'rgb(153, 153, 153)',marginLeft:'1.067vw'}}>/{item.Size}</span>
                <Icon style={{width:'5.334vw', fontSize:'5.334vw',color:'#00CCCC',float:'right',marginRight:'2vw'}} type="shopping-cart" />
            </div>
    </List.Item>) }
    />
    </>)
    
 
}}
export default Bsyx;