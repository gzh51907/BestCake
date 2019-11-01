import React, { createContext, Component } from "react";
import { Checkbox, InputNumber, Icon } from "antd";
import './recommend.scss';
// import MyContext from '../context';

class Recommend extends Component {
    state = {
        datalist: [
            {
                image: '../../assest/mw_firm_sq.jpg',
                title: '伴手礼系列-吉致生巧',
                price: '168.00/1盒'
            },
            {
                image: '../../assest/mw_firm_nzt_v1.jpg',
                title: '伴手礼系列-吉致牛轧糖',
                price: '68.00/16粒装'
            },
            {
                image: '../../assest/mw_firm_pf_v1.jpg',
                title: '伴手礼系列-吉致泡芙',
                price: '88.00/0.8磅'
            },
        ]
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
                                    <Icon type="shopping"></Icon>
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