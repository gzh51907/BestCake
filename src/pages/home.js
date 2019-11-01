import React,{Component}from "react";
import Api from "@/api"
import { Layout, Row, Col ,Carousel , Icon,List, Skeleton ,Drawer} from 'antd';
import "../css/home.scss";
const {Content } = Layout;
import Navbar from "@/components/navbar";

class Home extends Component{
    state={
        //轮播图
        SwiperBannerList:[],
        bannerimg:"https://res.bestcake.com/images/newIndex/title.png?v=1",
        TopIconList:[],
        CenterContentList:[],
        SaleList:[],
        placename:"上海",
        visible: false,
        placelist:[
            '上海','苏州','杭州','宁波','无锡','南京','北京','天津']
    }

async componentDidMount(){
        let {data} = await Api.get_homedata();
        console.log(data);
        //  格式化数据
        this.setState({
            SwiperBannerList:data[0].Tag.mainresult.SwiperBannerList,
            TopIconList:data[0].Tag.mainresult.TopIconList,
            CenterContentList:data[0].Tag.mainresult.CenterContentList,
            SaleList:data[0].Tag.mainresult.SaleList
        })

        //修正边距
        let arr = document.querySelectorAll(".commodity-goods .ant-row")[0];
        arr.style.margin = 0;
    }
    goto=(name)=>{
        this.props.history.push({
            pathname:"/detail",
            query:name
        })
    }
    changePlace = ()=>{
        this.setState({
            visible: true,
        });
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
        }
    addit=(place)=>{
        this.setState({
            placename:place,
            visible: false
        }); 
    }

    render(){
        let  {SwiperBannerList,bannerimg,
            TopIconList,CenterContentList,
            SaleList,placename,placelist} = this.state;
        // console.log(SaleList)
        if(SaleList.length){
            return(
                <Layout className="bestcake" style={{background:"white",width:"100%"}}>
                    <Row >
                        <Col span={10} style={{fontSize:16}}  onClick={this.changePlace}>
                        <Icon type="environment" style={{fontSize:25}}/> &nbsp;{placename}&nbsp;
                        <Icon type="right" />
                        </Col>
                    </Row>
                    <Drawer
                    title="选择城市"
                        placement="top"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        >
                            <div >
                            {
                                placelist.map((item,index)=><p key={index}  style={{width:50,display:"inline-block"}} >
                                    <span  onClick={this.addit.bind(this,item)}  style={{width:50}}>
                                        {item}
                                    </span>
                                </p>)
                            }
                            </div>
                        </Drawer>
                    <Content >


                        <Carousel autoplay style={{marginLeft:16,paddingBottom:0,paddingTop:0}}>
                            {
                                SwiperBannerList.map(item=>(<div key={item.Id}  style={{borderRadius:"5%"}}>
                                    <img src={item.ImgUrl}   style={
                                        {
                                            width:340,height:200
                                        }
                                    }/>
                                </div>)) 
                            }
                        </Carousel>
    
                        <Row>
                            <img src={bannerimg} style={
                                {
                                    width:"100%",
                                    height:40
                                }
                            }/>
                            <img src="https://res.bestcake.com/m-images/banner1_list/799433242542246500.jpg" style={
                                {
                                    width:"90%",
                                    height:86,
                                    marginLeft:16,
                                    marginRight:16
                                }
                            }/>
                        </Row>
                        <List  className="commodity-goods" style={{marginTop:15}}
                            grid={{ gutter: 10, column: 4 }}
                            dataSource={TopIconList}
                            renderItem={item => (
                            <List.Item style={{margin:0,width:'100%'}}>
                                <div style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                    <img src={item.ImgUrl} style={{width:' 13.8667vw',height:'13.8667vw'}}/>
                                    <p  style={{fontSize:12,marginTop:8}}>
                                        { item.ActName}
                                    </p>
                                </div>
                            </List.Item>
                            )}
                        />
                        <Row  className="brodercast">
                                <div className="brodercastb">通知</div>
                                <div className="broadcastTexts">
                                    <p  className="tex">
                                    贝思客官方申明：我司近期发现有客户通过非正常渠道售卖的代金卡无法正常使用，目前我司正通过法律途径解决此问题。我司在此郑重申明，从未授权过任何渠道售卖我司代金卡，请客户通过正常渠道（如：官网、公司销售）进行购买消费。​
                                    </p>
                                </div>
                        </Row>
                        <Row  className="special">
                            {
                        CenterContentList.map(
                            item=>
                                <img key={item.Id} className="special-item"  src={item.ImgUrl}/>
                        )
                            }
                        </Row>
                        <Row className="box-header">
                        <img src="https://res.bestcake.com/m-images/HotRecommend/571060506020139900.jpg" />
                        </Row>
                        < Row className="wrap-box" style={{width:"100%"}}>
                            {       
                                JSON.parse(SaleList[0].CakeList).map((item,index)=>{
                                    let anurl1 = `https://res.bestcake.com/m-images/ww/jd/${item.Name}.png`
                                    let anurl2 = `https://res.bestcake.com/m-images/ww/ns/${item.Name}.jpg`
                                    // console.log('11',)
                                    return  <div className="item-box" key={item.Id} onClick={this.goto.bind(this,item.Name)}>
                                                <img src={(index<2)?anurl1:anurl2} />
                                                <p className='p-name'>{item.Name}</p>
                                                <div className="item-inf">
                                                    <span className="spl">${item.Price}</span>
                                                    <span className="spr">/{item.Size}</span>
                                                </div>
                                            </div>
                                }
                                    )
                            }
    
                        </ Row>
                        <Row className="box-header">
                        <img src="https://res.bestcake.com/m-images/HotRecommend/427276281583982800.jpg" />
                        </Row>
                        < Row className="wrap-box" style={{width:"100%"}}>
                            {       
                                // console.log(SaleList[0].CakeList)
                                JSON.parse(SaleList[1].CakeList).map((item,index)=>{
                                    let anurl1 = `https://res.bestcake.com/m-images/ww/jz/${item.Name}.png`
                                    // let anurl2 = `https://res.bestcake.com/m-images/ww/ns/${item.Name}.jpg`
                                    // console.log('11',)
                                    return  <div className="item-box" key={item.Id} onClick={this.goto.bind(this,item.Name)} >
                                                <img src={anurl1} />
                                                <p className='p-name'>{item.Name}</p>
                                                <div className="item-inf">
                                                    <span className="spl">${item.Price}</span>
                                                    <span className="spr">/{item.Size}</span>
                                                </div>
                                            </div>
                                }
                                    )
                            }
    
                        </ Row>
                        <Row className="box-header">
                        <img src="https://res.bestcake.com/m-images/HotRecommend/497197919096789000.jpg" />
                        </Row>

                        < Row className="wrap-box" style={{width:"100%"}}>
                            {       
                                // console.log(SaleList[0].CakeList)
                                JSON.parse(SaleList[2].CakeList).map((item,index)=>{
                                    // let anurl1 = `https://res.bestcake.com/m-images/ww/jd/${item.Name}.png`
                                    let anurl2 = `https://res.bestcake.com/m-images/ww/rp/${item.Name}.jpg`
                                    // console.log('11',)
                                    return  <div className="item-box" key={item.Id} onClick={this.goto.bind(this,item.Name)}>
                                                <img src={anurl2} />
                                                <p className='p-name'>{item.Name}</p>
                                                <div className="item-inf">
                                                    <span className="spl">${item.Price}</span>
                                                    <span className="spr">/{item.Size}</span>
                                                </div>
                                            </div>
                                }
                                    )
                            }
    
                        </ Row>
                    </Content>
                
                    <Navbar />
                </Layout>
            )
        }else{
            return <Skeleton />
        }

    }
}
export default Home;