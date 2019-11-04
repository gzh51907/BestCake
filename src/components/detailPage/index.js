import React, { Component } from "react";
import Api from "@/api"
import { Carousel ,Layout , InputNumber ,Row,Col} from 'antd';
import '@/css/detail.scss'
// import { getFileItem } from "antd/lib/upload/utils";
import { connect } from 'react-redux';
const mapStateToProps=(state)=>{
    return{
        cart:state.Cart
    }
    }
const mapDispatchToProps = dispatch => {
    return {
        ADD_TO_CART:({iname,goodsnum})=>{dispatch({type:'ADD_TO_CART',payload:{name:iname,num:goodsnum}})},//payload传新的商品名name和数量num过来添加
        CHANGE_QTY:({iname,goodsnum})=>{dispatch({type:'CHANGE_QTY',payload:{name:iname,num:goodsnum}})},//payload传商品名name和新的数量num过来，更新该商品的数量
        dispatch//可自定义action或什么不传获取全部Cart
}
}

let recvParam;
@connect(mapStateToProps,mapDispatchToProps)
class Detail extends Component{

    state ={
        detaildata:null,
        piclist:[],
        goodsnum:1,
        Size:null,
        CurrentPrice:null,
        str_con:null,
        showha:false,
        iname:null,
        recvParam:null
    }

    AddToCart=({iname,goodsnum})=>{
        let props =this.props;
        let isok = false;
        let cart =props.cart
        cart.forEach(i=>{//如果购物车已存在就增加数量
            if(i.name==iname){ isok=true}
        })
        if(isok){props.CHANGE_QTY({iname,goodsnum})}
        else{props.ADD_TO_CART({iname,goodsnum})}
    };

    buynow = ({iname,goodsnum})=>{
        this.AddToCart({iname,goodsnum});
        let loaclcart = JSON.parse(localStorage.getItem('usergoods')) ;
        let isok2 =false;
        if(loaclcart){//浏览器购物车有数据
            loaclcart.forEach((i,idx)=>{
        if(i.title==iname){//浏览器缓存已存在该商品，就增加数量
            loaclcart[idx].qty=loaclcart[idx].qty+goodsnum;
            isok2=true;
        }
        })
        if(!isok2){loaclcart.push({title:iname,qty:goodsnum})}
        localStorage.setItem('usergoods',JSON.stringify(loaclcart) )
        }else{
            localStorage.setItem('usergoods',JSON.stringify([{title:iname,qty:goodsnum}])) 
        }
        this.setState({
            showha:true
        })
    };

    gocart=({iname,goodsnum})=>{
        this.AddToCart({iname,goodsnum});
        if(localStorage.getItem("phone")){
            this.props.history.push("/cart")     
        }else{
            this.props.history.push("/mine") 
        }
    };
    
    goorder=({iname,goodsnum})=>{
        this.AddToCart({iname,goodsnum});
        let loaclcart1 = JSON.parse(localStorage.getItem('usergoods')) ;
        let isok21 =false;
        if(loaclcart1){//浏览器购物车有数据
            loaclcart1.forEach((i,idx)=>{
        if(i.title==iname){//浏览器缓存已存在该商品，就增加数量
            loaclcart1[idx].qty=loaclcart1[idx].qty+goodsnum;
            isok21=true;
        }
        })
        if(!isok21){loaclcart1.push({title:iname,qty:goodsnum})}
        localStorage.setItem('usergoods',JSON.stringify(loaclcart1) )
        }else{
            localStorage.setItem('usergoods',JSON.stringify([{title:iname,qty:goodsnum}])) 
        }
        if(localStorage.getItem("phone")){
            this.props.history.push("/order")     
        }else{
            this.props.history.push("/mine") 
        }
    };

    showit=()=>{
        this.setState({
            showha:false
        })
    };

    async componentDidMount(){

    if(this.props.location.query){//判断当前有参数
        recvParam=this.props.location.query;
        sessionStorage.setItem('data',recvParam);// 存入到sessionStorage中
    }else{
        recvParam=sessionStorage.getItem('data');// 当state没有参数时，取sessionStorage中的参数
    }
    // this.setState({
    //     recvParam
    // })
        let name =recvParam;
        let {data} = await Api.get_detaildata(name);
        // console.log(data)
            this.setState({
                detaildata:data[0],
                iname:data[0].Name,
                Size:data[0].Size,
                CurrentPrice:data[0].CurrentPrice,
                str_con : data[0].imgurl.slice(37,39)
            })

            document.title=name;
            //图片处理
                var res = [];
            if(this.state.str_con){
                for(var i = 1; i <=4; i++) {
                let anurl = `https://res.bestcake.com/m-images/${this.state.str_con}-detail/${data[0].Name}/${data[0].Name}-${i}.jpg`
                    res.push(anurl)
                }
                this.setState({
                    piclist:res
                })
            }else{
                for(var i = 1; i <=4; i++) {
                let anurl = `https://res.bestcake.com/m-images/rp-detail/${data[0].Name}/${data[0].Name}-${i}.jpg`
                    res.push(anurl)
                }
                this.setState({
                    piclist:res
                })
            }

            // console.log(this.state.piclist)
    }

    render(){
        let {piclist,detaildata,Size,goodsnum,CurrentPrice,showha,iname} = this.state;
        // console.log(detaildata)
            if(detaildata){
                return(
                    <Layout className="detail_wrap_box"
                    style={{
                        backgroundColor:"#f7f7f7"
                    }}>
                    <Row  className="row1" >
                    <Carousel effect="fade">
                        {
                            piclist.map(item=>
                                <img src={item}  key={item}/>
                                )
                        }
                    </Carousel>
                    <div className="cake_title"  style={{
                        backgroundColor:"#fff"
                    }} >
                            <div className="cake_inf"
                            style={{
                                lineHeight:' 4.53vw',
                                fontWeight: 'bold',
                                color:'#333',
                                fontSize:'4.53vw',
                                marginTop:'2vw',
                                marginBottom: '4vw',
                                textAlign:"center"
                            }}>
                                {detaildata.Name}
                            </div>
                            <div className="promotion-activity"
                            style={{
                                marginRight:"auto",
                                fontSize:"4vw",
                                lineHeight:"8vw",
                                width:"8vw",
                                height:"8vw",
                                textAlign:"center",
                                color:"white",
                                borderRadius:"2px",
                                background:"#f2495e",
                                marginLeft:"auto"
                            }}>
                                <span>新</span>
                                <span>折</span>
                            </div>
                    </div>
                    </Row>

                    <Row className="inf_content"  style={{
                        backgroundColor:"#fff"
                    }}>

                    <div  style={{
                            marginBottom: '2.93vw',
                            marginTop: '9.066vw',
                            height:20,
                    }}>

                        <div style={{
                            fontSize: '3.73vw',
                            float: 'left',
                            width: '15.93vw',
                            marginLeft:' 4vw',
                            color:' #9A9A9A'
                        }}>甜度</div>
                        <div  style={{
                            fontSize: '3.73vw',
                            float: 'left',
                            width: '72vw',
                            marginLeft: '4vw',
                            marginRight: '4vw'
                        }}>
                            <img 
                            style={{
                                verticalAlign: 'top',
                                width: '22.4vw',
                                marginTop:' 0.6vw'
                            }}
                            src="https://res.bestcake.com/m-images/ww/jz/tiandu_4.png" />
                        </div>
                    </div>
                    <div  style={{
                            height:20,marginBottom: 10, marginTop: '4.066vw'
                    }}>
                        <div style={{
                            fontSize: '3.73vw',
                            float: 'left',
                            width: '15.93vw',
                            marginLeft:' 4vw',
                            color:' #9A9A9A'
                        }}>口味</div>
                        <div  style={{
                            fontSize: '3.73vw',
                            float: 'left',
                            width: '72vw',
                            marginLeft: '4vw',
                            marginRight: '4vw',
                            color:" #000"
                        }}>
                        萌幻慕斯
                        </div>
                    </div>
                    
                    <div  style={{
                            height:20,
                            marginBottom:10,
                            marginTop: '4.066vw'
                    }}>
                        <div style={{
                            fontSize: '3.73vw',
                            float: 'left',
                            width: '15.93vw',
                            marginLeft:' 4vw',
                            color:' #9A9A9A'
                        }}>原材料</div>
                        <div  style={{
                            fontSize: '3.73vw',
                            float: 'left',
                            width: '72vw',
                            marginLeft: '4vw',
                            marginRight: '4vw',
                            color:"#000"
                        }}>
                        麦芽糖饴、白砂糖、奶粉、饮用水、黄油、白巧克力、鸡蛋、开心果酱、杏仁
                        </div>
                    </div>

                    <div  style={{
                            height:20,
                            marginBottom:10,
                            marginTop: '4.066vw'
                    }}>
                        <div style={{
                            fontSize: '3.73vw',
                            float: 'left',
                            width: '15.93vw',
                            marginLeft:' 4vw',
                            color:' #9A9A9A'
                        }}>适合人群</div>
                        <div  style={{
                            fontSize: '3.73vw',
                            float: 'left',
                            width: '72vw',
                            marginLeft: '4vw',
                            marginRight: '4vw',
                            color:"#000"
                        }}>
                        所有人群
                        </div>
                    </div>
                    <div  style={{
                            height:20,
                            marginBottom:10,
                            marginTop: '4.066vw'
                    }}>
                        <div style={{
                            fontSize: '3.73vw',
                            float: 'left',
                            width: '15.93vw',
                            marginLeft:' 4vw',
                            color:' #9A9A9A'
                        }}>保鲜条件</div>
                        <div  style={{
                            fontSize: '3.73vw',
                            float: 'left',
                            width: '72vw',
                            marginLeft: '4vw',
                            marginRight: '4vw',
                            color:"#000"
                        }}>
                        常温储存，避免阳光直射。
                        </div>
                    </div>
                    </Row>

                    {/* 评价 */}
                    <div className="com_wrap"  style={{
                        backgroundColor:"#fff",
                        marginBottom:10
                    }}>
                        <div className="cl">
                            <span className="spl">
                                <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png"/>
                            </span>
                            <span className="spr">
                            商品评价
                            </span>
                        </div>

                        <div className="cr">
                            <div className='right'>
                                <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-b.png"/>
                            </div>
                            <p className="num">
                            (640条)
                            </p>
                        </div>
                    </div>

                    {/* 选择chcun */}
                    <Row className="size-wrap"   style={{
                        backgroundColor:"#fff"
                    }}>
                        <div className="choose_size">
                            <div className="choose-button">{Size}</div>
                        </div>
                        <div className="rec-inf" style={{paddingBottom:15}}>
                            <div className="inf-item">
                                <div className="left">
                                    <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1-round.png?v=112"/>
                                </div>
                                <div className="ms"> 直径15cm</div>

                            </div>
                            <div className="inf-item">
                                <div className="left">
                                    <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png"/>

                                </div>

                                {/* <div className="right"> */}
                            <div className="ms"> 适合4-5人分享</div>
                                {/* </div> */}
                            </div>
                        </div>
                    </Row>

                    {/* 数量选择 */}
                    <Row  style={{backgroundColor:"white",marginTop:15,marginBottom:10,padding:"10 0"}}>
                        <Col span={12}  style={{float:"left",paddingLeft:20}}>购买数量</Col>
                        <Col span={12}>
                        <InputNumber style={{float:"right",marginRight:20}} min={1} max={20} defaultValue={1} onChange={(value)=>{
                            this.setState({
                                goodsnum:value
                            })
                        }} />
                        </Col>
                    </Row>

                    <Row  className="message" style={{marginBottom:80}}>
                    <div  className="gonggao"  style={{display:'flex',marginBottom:20}}>
                        <div className="left1" style={{width:"30%"}}>
                        划线价格
                        </div>
                        <div className="right1" style={{width:"65%"}}>
                        商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。 
                        </div>
                    </div>
                    <div  className="gonggao"  style={{display:'flex'}}>
                        <div className="left1" style={{width:"30%"}}>
                        未划线价格
                        </div>
                        <div className="right1" style={{width:"65%"}}>
                        商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。
                        </div>
                    </div>
                    </Row>
                    <div className="cake-fhsy" style={{
                        position:"fixed",
                        right:-1,
                        top:"4vw",
                        backgroundColor:"rgba(255,255,255,0.5)",
                        borderRadius: '1.2vw 0vw 0vw 1.2vw',
                        lineHeight:"8vw",
                        textAlign:"center",
                        zIndex:99,
                        border:"1px solid #333",
                        padding:5
                    }}>
                        <span style={{margin:3}}>更多产品</span>
                    </div>
                    
                    <div className="paybox">
                        <div className="purchase-c">
                            <div className="purchase-c1">
                                {
                                   ( goodsnum * CurrentPrice).toFixed(2)
                                }
                            </div>
                            <div className="purchase-c2">
                            <div className="purchase-c2-left">
                            已优惠：
                            </div>
                            <div className="purchase-c2-right">
                            0.00
                            </div>
                        </div>
                        </div>
                        <div className="purchase-a" onClick={this.goorder.bind(this,{iname,goodsnum})}>
                            <div className="purchase-1">
                            立即购买
                            </div>
                        </div>
                        <div className="purchase-b" onClick={this.buynow.bind(this,{iname,goodsnum})}>
                            <div className="purchase-2">
                        加入购物车
                            </div>
                        </div>
                    </div>

                    <div style={(showha)?{display:'block'}:{display:'none'}}>
                    <div className="zhezhao" style={{
                        position: 'fixed',
                        background: 'rgb(0, 0, 0)',
                        zIndex: 10000200,
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '100%',
                        height: 1499,
                        opacity: 0.8,
                        

                    }}>
                        <div style={{
                            position: 'fixed',
                            left: -4,
                            top:' 50.53vw',
                            zIndex: 100002001
                        }}>
                            <div style={{
                                marginLeft:50,
                                marginRight: 'auto',
                                width: '77.33vw',
                                background: '#fff',
                                textAlign: 'center',
                                borderRadius: 2,
                                display: 'inline-block',
                                zIndex:12345,
                                opacity:1

                            }}>
                                <div style={{
                                paddingTop:'10.66vw',color:'#333',
                                fontSize:' 4vw', margin:'0 6.33vw', marginBottom:'15.2vw'
                                }}>
                                    成功添加到购物车
                                </div>

                                <div onClick={this.showit}
                                style={{color:'#000', fontSize: '4vw', float:'left', width:'38.265vw',fontWeight:"bold",
                                marginBottom:'4vw'}}>
                                    再看看
                                </div>
                                <div style={{width:'0.266vw', height:'5.33vw', float:'left', background:'#999',ontWeight:"bold",
                                marginTop: '1vw'}}>
                                    &nbsp;
                                </div>
                                <div onClick={this.gocart.bind(this,{iname,goodsnum})}
                                style={{color:'#02d3d6',fontSize: '4vw', float:'left', width:'38.265vw', marginBottom:'4vw'}}>
                                    去结算
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </Layout>
                )
            }else {
                return <div>加载中</div>
            }

    }
}

export default Detail;