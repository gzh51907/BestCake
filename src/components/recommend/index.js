import React, { createContext, Component } from "react";
import { Icon } from "antd";
import './recommend.scss';
// import MyContext from '../context';

class Recommend extends Component {
    state = {
        datalist: [
            {
                image: 'https://res.bestcake.com/m-images/ww/jd/极地牛乳.png?v=19',
                title: '极地牛乳',
                price: '218.00/1盒',
                qty: 1
            },
            {
                image: 'https://res.bestcake.com/m-images/ww/jd/布朗尼精灵.png?v=19',
                title: '布朗尼精灵',
                price: '218.00/16粒装',
                qty: 1
            },
            {
                image: 'https://res.bestcake.com/m-images/ww/jd/白色红丝绒.png?v=19',
                title: '白色红丝绒',
                price: '218.00/0.8磅',
                qty: 1
            },
        ],
        storageList: []
    }
    componentDidMount() {
        // 找未登录前存在localstorage的商品信息
        let { storageList } = this.state;
        let res = localStorage.getItem("usergoods");
        let trun = JSON.parse(res);
        storageList = trun
        this.setState({
            storageList
        })
        // console.log('dataList', datalist);
    }
    addGoods = (inf) => {
        let { datalist } = this.state;
        let isok = null;
        let arr = [];
        let newArr = [];
        let user_res = localStorage.getItem("usergoods");
        let sum_res = localStorage.getItem("sumgoods");
        let phone_res = localStorage.getItem("phone");
        //  ------------------未登录前存到stroage中的usergoods---------------
        if (!phone_res) {
            // 本地已存在商品，判断要添加的商品在本地是否存在
            if (user_res) {
                let mid = JSON.parse(user_res);
                for (let i = 0; i < mid.length; i++) {
                    if (inf.title === mid[i].title) {
                        // 本地已存在
                        mid[i].qty = mid[i].qty * 1 + 1;
                        isok = true;
                        break;
                    } else {
                        isok = false;
                    }
                }
                // 本地不存在，添加
                if (!isok) {
                    mid.push(inf)
                }
                newArr = mid;
                localStorage.setItem('usergoods', JSON.stringify(newArr));
            }
            else {
                // 本地不存在商品直接添加
                arr.push(inf)
                localStorage.setItem('usergoods', JSON.stringify(arr));
            }

        } else {
            //----------------登录后存到stroage中的sumgoods---------------
            sum_res = JSON.parse(sum_res);
            console.log('inf:', inf.title, 'qty', inf.qty)
            sum_res.forEach(item => {
                if (item.title === inf.title) {
                    item.qty = item.qty * 1 + inf.qty
                }
            })
            localStorage.setItem("sumgoods", JSON.stringify(sum_res));
            console.log('dataList', datalist);
            // 更新dataList

        }
    }

    render() {
        let { datalist } = this.state;
        return (
            <div className="recommend">
                <h2>Hot Recommend</h2>
                <em></em>
                <h5>热销新品推荐</h5>
                <ul>
                    {
                        datalist.map(item => {
                            return <li key={item.title}>
                                <img src={item.image} />
                                <span>{item.title}</span>
                                <p>
                                    <b>{item.price}</b>
                                    <span onClick={this.addGoods.bind(this, { title: item.title, qty: item.qty })}>
                                        <Icon type="shopping"></Icon>
                                    </span>
                                </p>
                            </li>
                        })
                    }

                </ul>
            </div>

        )
    }
}
export default Recommend;