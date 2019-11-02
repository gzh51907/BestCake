import React, { createContext, Component } from "react";
import { Icon } from "antd";
import './recommend.scss';
// import MyContext from '../context';

class Recommend extends Component {
    state = {
        datalist: [
            {
                image: '../../assest/mw_firm_sq.jpg',
                title: '伴手礼系列-吉致生巧',
                price: '168.00/1盒',
                qty: 1
            },
            {
                image: '../../assest/mw_firm_nzt_v1.jpg',
                title: '伴手礼系列-吉致牛轧糖',
                price: '68.00/16粒装',
                qty: 1
            },
            {
                image: '../../assest/mw_firm_pf_v1.jpg',
                title: '伴手礼系列-吉致泡芙',
                price: '88.00/0.8磅',
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
        // console.log('dataList', dataList);
    }
    addGoods = (inf) => {
        let isok = null;
        let arr = [];
        let newArr = [];
        let user_res = localStorage.getItem("usergoods");
        let phone_res = localStorage.getItem("phone");
        //  未登录前
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