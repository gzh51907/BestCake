import React, { Component} from "react";
import {Button,Icon,TimePicker,DatePicker,Divider,Modal } from "antd";
import {withRouter} from 'react-router-dom'
import TJ from '../components/TJ';
import BZ from '../components/BZ'
import Adress from '../components/adress';
import API from '../api';
import store from '../store'
import {connect} from 'react-redux';
const {bsk} = API;
const mapStateToProps=(state)=>({
    cart:state.Cart
})
const mapDispatchProps=(dispatch)=>{
    return{
        ALL_CART:(cart)=>{dispatch({type:'ALL_CART',payload:cart})},//payload传新的cart
        dispatch//可自定义action或什么不传获取全部Cart
    }
}
@connect(mapStateToProps,mapDispatchProps)
@withRouter
class Order extends Component{
    constructor(){
        super();
        this.handleOpenChange= this.handleOpenChange.bind(this);
        this.maskclick = this.maskclick.bind(this);
        this.addorder=this.addorder.bind(this);
        this.init = this.init.bind(this)
    }
    state={
        datalist:[],
        total:0,//所有的价格
        goodstotal:0,//只是商品的total
        open: false ,
        tj:null, //为0时是添加餐具，为1时是添加蜡烛
        adressobj:{//收货地址信息
            phone:'',
            name:'',
            city:'',
            adress:'',
            door:'',
            isok:false
        }
    }
    
    handleOpenChange = open => {
        this.setState({ open });
      };
    async componentDidMount(){
        document.body.style="background:rgb(247, 247, 247);padding:0;margin:0";
        document.getElementsByClassName('ant-calendar-picker-input ant-input ant-input-sm')[0].style.border = "none";
        document.getElementsByClassName('ant-time-picker-input')[0].style.border = "none";
        let {data} = await bsk.get('/cart/user',{
            params:{
                phone:'89766'
            }
        })
        let cart = data.data[0].cartinf.map(item=>{
            return {
                name:item.Name,
                num:item.qty
            }
        })
        this.props.ALL_CART(cart)//请求回来的数据更新仓库
        this.init()
        store.subscribe(()=>{
            this.init()
        })
    } 
    init=async ()=>{//初始化
        let total=0;
        let {cart} = this.props;
        let arr = cart.map(item=>{
            return {'Name':item.name}
        })
         let result = await bsk.get('/listpages/detail',{
           params:{
               Name: JSON.stringify(arr) 
           }
        })
        let datalist =result.data.data.map((item,idx)=>{
            return{
               imgurl:item.imgurl,
               Name:item.Name,
               CurrentPrice:item.CurrentPrice,
               Size:item.Size,
               num:cart.filter(i=>{ return i.name==item.Name})[0].num
            }
        });
        this.setState({
            datalist
        })
        this.state.datalist.forEach(i=>{//计算价格总和
            total+=i.CurrentPrice*i.num;
         })
         
         this.setState({
             total:total.toFixed(2),
             goodstotal:total.toFixed(2)
         })
    }
    
     bodyscrool= function(e){
       e.preventDefault();
   }
   changetotal=(total)=>{//添加部分修改总价格,这里的total参数为添加的蜡烛类价格和
    let{goodstotal} = this.state;
     this.setState({
         total:(goodstotal-0+total).toFixed(2)
     })
   }
    TJckick=(i)=>{
          document.getElementsByClassName('outer-mask')[0].style.display='block';
         let tj = i;
         this.setState({
             tj
         });
         document.body.addEventListener('touchmove',this.bodyscrool, { passive: false });//禁止页面滚动
        let TJ = document.getElementById('TJ')
         TJ.style.display='block';
         TJ.style.bottom="0";
    }
     maskclick=()=>{
        document.body.removeEventListener('touchmove',this.bodyscrool,{ passive: false });
        document.getElementsByClassName('outer-mask')[0].style.display = 'none';
        let TJ = document.getElementById('TJ')
         TJ.style.bottom='-100%';
         document.getElementsByClassName('bz_list')[0].style.display='none';
        // TJ.style.display='none';
    }
    BZ=()=>{
        document.body.addEventListener('touchmove',this.bodyscrool, { passive: false });//禁止页面滚动
        document.getElementsByClassName('outer-mask')[0].style.display='block';
        document.getElementsByClassName('bz_list')[0].style.display='block';
    }
    showadress=()=>{
        document.getElementsByClassName('adress')[0].style.display='block';
    }
    adressinf=(adressobj)=>{//从表单获取地址信息函数
        this.setState(
           {
               adressobj
           }
        )
    }
    addorder=async ()=>{
        let{adressobj,datalist,total}=this.state;
        let {history} = this.props;
        let msg = document.getElementById('bz').innerHTML;
        if(adressobj.isok){//信息完备
           await bsk.post('/order/add',{
                order:{
                    userinf:adressobj,
                    goodsinf:datalist,
                    totalprice:total,
                    message:msg
                }
            })
            Modal.success({
                content: '订单完成，谢谢你的惠顾!',onOk(){
                    history.push('/home')
                }
              });
        }else{//信息没填完
            alert('请填完整收货信息！')
        }
    }
    render(){
        let {datalist,total,tj,adressobj} = this.state;
        let{showadress}=this;
        return(<div className="order123" style={{padding:'0vw 4vw',position:'relative',width:'100vw',marginBottom:'14.5vw',overflow:'hidden'}}>
             <div style={{backgroundColor:'rgb(255, 255, 255)'}}>
                 <section style={{padding:'2.66667vw 0'}}>
                     {
                         function(){
                            if(adressobj.isok){
                               return(<div className="address-item">
                                   <div className='address-item-y'>
                                        <p className='title'>订单配送至</p>
                                        <p className='address-detail'>
                                            <span className='address-text'>{adressobj.city+adressobj.adress+adressobj.door}</span>
                                        </p>
                                        <h2 className='address-name'>
                                            <span>{adressobj.name}</span>
                                            <span className='phone'>{adressobj.phone}</span>
                                            <span>运费0.00</span>
                                            </h2>
                                   </div>
                               </div>)
                            }else{
                                return( <div onClick={showadress} style={{padding:'5.3333vw'}}>
                                <Button block style={{color:"#02d4d7",width:'50vw',height:'9.6vw',fontSize:'3.73vw',borderColor:'#02d4d7',borderRadius:'10vw',margin:'4.8vw 15vw'}}>
                                <Icon type="plus" />
                                    选择/添加收货地址
                                </Button>
                            </div>)
                            }
                         }()
                     }
                    
             </section>
             <section style={{borderBottom:'2.133vw solid #f5f5f5'}}>
                 <div style={{overflow:'hidden',padding:'4.26667vw 3vw'}}>
                     <div style={{float:'left' , height:'24px',lineHeight:'24px'}}>配送日期</div>
                     <div style={{float:'right'}}>
                     <DatePicker  size="small" placeholder="请选择" style={{width:"30vw"}}/>
                     </div>
                 </div>
                 <Divider style={{margin:0}} />
                 <div style={{overflow:'hidden',padding:'4.26667vw 3vw'}}>
                     <div style={{float:'left' , height:'24px',lineHeight:'24px'}}>配送时间</div>
                     <div style={{float:'right'}}>
                     <TimePicker  size="small" placeholder="请选择" style={{width:"30vw"}}/>
                     </div>
                 </div>
                 <Divider style={{margin:0}} />
                 <div style={{overflow:'hidden',padding:'4.26667vw 3vw'}}>
                     <div style={{float:'left' , height:'24px',lineHeight:'24px'}}>配送服务</div>
                     <div style={{float:'right', height:'24px',lineHeight:'24px'}}>
                      标准配送
                     </div>
                 </div>
             </section>
             <section className="datalist"style={{borderBottom:'2.133vw solid #f5f5f5'}}>
                <ul style={{padding:'0 5.333vw'}}>
                      {
                        datalist.map((item,idx)=>{
                            return(
                                <li key={idx} style={{display:'flex',padding:'3.2vw 0'}}>
                                    <img style={{width:'20vw',height:'20vw'}} src={item.imgurl}/>
                                    <div style={{marginLeft:'2.133vw',overflow:'hidden',flex:9}}>
                                        <div style={{fontSize:"4vw",fontWeight:600}}>{item.Name}</div>
                                        <div style={{fontSize:'2.93vw',fontWeight:500,color:"#888"}}>{item.Size}</div>
                                        <span style={{flex:4,color:'#f2495e',fontSize:'3.73vw'}} >
                                            <span style={{color:'#f2495e'}}>￥</span>
                                            {item.CurrentPrice}
                                        </span>
                                    </div>
                                    <span style={{flex:2,fontWeight:600,textAlign:"right"}}>x  {item.num}</span>

                                </li>
                            )
                        })
                      }
                </ul>
             </section>
             <section style={{borderBottom:'2.133vw solid #f5f5f5',padding:'4vw 5.333vw 4.8vw'}}>
                  <div style={{display:'flex',color:'#333',fontSize:'3.73vw',justifyContent:'space-between'}}>
                      <div style={{color:'#999',lineHeight:'3.06vw'}}>运费</div>
                      <div style={{lineHeight:'3.06vw'}}>0.00</div>
                  </div>
             </section>
             <section style={{borderBottom:'2.133vw solid #f5f5f5'}}>
                 <div style={{overflow:'hidden',padding:'4.26667vw 3vw'}} onClick={this.TJckick.bind(this,1)}>
                     <div  style={{float:'left' , height:'24px',lineHeight:'24px'}}>添加蜡烛</div>
                     <div id="TJ1" style={{float:'right'}}>
                      请选择
                     </div>
                 </div>
                 <Divider style={{margin:0}} />
                 <div style={{overflow:'hidden',padding:'4.26667vw 3vw'}} onClick={this.TJckick.bind(this,0)}>
                     <div  style={{float:'left' , height:'24px',lineHeight:'24px'}}>添加餐具</div>
                     <div id="TJ0" style={{float:'right'}}>
                     请选择
                     </div>
                 </div>
                 <Divider style={{margin:0}} />
                 <div onClick={this.BZ} style={{overflow:'hidden',padding:'4.26667vw 3vw'}}>
                     <div style={{float:'left' , height:'24px',lineHeight:'24px'}}>备注</div>
                     <div id='bz' style={{float:'right', height:'24px',lineHeight:'24px'}}>
                      请填写
                     </div>
                 </div>
             </section>
             </div>
             <div onClick={this.maskclick} className="outer-mask"></div>
             <footer className='action-bar' style={{backgroundColor:'rgb(51, 51, 51)'}}>
                 <span>￥{total}</span>
                 <button onClick={this.addorder} className='submitbtn'>提交订单</button>
                 </footer>
             <TJ item={tj} changetotal={this.changetotal} ></TJ>
             <BZ></BZ>
             <Adress getsdress={this.adressinf}></Adress>
        </div>)
    }
}

export default Order;