import React, { Component } from "react";
import Api from "@/api"
import { Carousel ,Layout , InputNumber ,Row,Col} from 'antd';
import '@/css/detail.scss'
// const { Content } = Layout;
class Detail extends Component{

    state ={
        detaildata:null,
        piclist:[],
        goodsnum:1,
        Size:null,
        CurrentPrice:null,
        str_con:null,
    }

onChange(value) {
        }

    async componentDidMount(){
        let name = this.props.location.query;
        let {data} = await Api.get_detaildata(name);
        console.log(data)
            this.setState({
                detaildata:data[0],
                Size:data[0].Size,
                CurrentPrice:data[0].CurrentPrice,
                str_con : data[0].imgurl.slice(37,39)
            })

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

            console.log(this.state.piclist)
    }

    render(){
        let {piclist,detaildata,Size,goodsnum,CurrentPrice} = this.state;
        console.log(detaildata)
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
                        <div className="purchase-a">
                            <div className="purchase-1">
                            立即购买
                            </div>
                        </div>
                        <div className="purchase-b">
                            <div className="purchase-2">
                        加入购物车
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