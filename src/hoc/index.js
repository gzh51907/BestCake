import React,{Component} from 'react';

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

export  default {
    withState
}