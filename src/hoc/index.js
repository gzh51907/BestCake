import React,{Component} from 'react';
import Api from "@/api"
export function withState(InnerComponent){
    return class extends Component{
        constructor(){
            super()
            this.state = {
                data:{
                    selected:[],
                    cartlength:1,
                    navlist:[
                        {   id:1,
                            text:"首页",
                            icon:"home",
                            path: '/home',
                        },
                        {   id:2,
                            text:"分类",
                            icon:"bars",
                            path: '/list',
                        },
                        {   id:3,
                            text:"购物车",
                            icon:"shopping-cart",
                            path: '/cart',
                        },
                        {   id:4,
                            text:"我的",
                            icon:"user",
                            path: '/mine',
                        },
                    ]
                }
            }
        }
        render(){
            let {data} = this.state;
            return <InnerComponent data={data}/>
        }
    }
}

export function withHome(InnerComponent){
    return class extends Component{
        constructor(){
            super()
            this.state = {
                data:{
                    SwiperBannerList:[],
                    bannerimg:"https://res.bestcake.com/images/newIndex/title.png?v=1",
                    TopIconList:[],
                    CenterContentList:[],
                    SaleList:[]
                }
            }
        }
            
        async componentDidMount(){
            let {data} = await Api.get_homedata();
            // console.log(data);
            //  格式化数据
            this.setState({
                SwiperBannerList:data[0].Tag.mainresult.SwiperBannerList,
                TopIconList:data[0].Tag.mainresult.TopIconList,
                CenterContentList:data[0].Tag.mainresult.CenterContentList,
                SaleList:data[0].Tag.mainresult.SaleList
            })
        }
        render(){
            let {data} = this.state;
            return <InnerComponent data={data}/>
        }
    }
}

export  default {
    withState,
    withHome
}