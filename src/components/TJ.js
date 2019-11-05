import React, { Component } from 'react';
import {InputNumber} from 'antd';
import '../css/TJ.scss';
class TJ extends Component{
    constructor(){
        super();
        this.state={
           data:[
               {
                   title:'添加餐具',
                   price:'3.00',
                   means:'BestCake餐具',
                   value:0
               },
               {
                   title:'添加蜡烛',
                   price:'5.00',
                   means:'标准蜡烛',
                   value:0
               }
           ]
        }
        this.onChange = this.onChange.bind(this)
    }
  onChange(value) {
    let idx = this.props.item
    document.getElementById(`TJ${idx}`).innerHTML = value?value:"请选择";
    let {data} = this.state;
    data[idx].value = value;
    let value1 = document.getElementById('TJ0').innerHTML;
    let value2 = document.getElementById('TJ1').innerHTML;
    value1=Number(value1)?value1:0;
    value2=Number(value2)?value2:0;
    this.props.changetotal(value1*3+value2*5);
  }
  closeTj=()=>{
    this.props.closeTj()
  }
    render(){
        let item = this.state.data[this.props.item?this.props.item:0]
     
               return(
            <div id="TJ" className="cj_list tableware_list outer_1DxCK" style={{display:'none'}}>
                <h3>{item.title} <a onClick={this.closeTj}>关闭</a></h3>
                <div className='inner'>
                 <div className='input_wrap'>
                     <div className='tableware-list-cj'>
                         <div className='cj-clplr-1'>{item.means}</div>
                         <div className='cj-clplr-2'>{item.price}</div>
                         <div className='cj-clplr-3'>
                         <InputNumber key={this.props.item} size="small" min={0} max={100} defaultValue={item.value} onChange={this.onChange} />
                         </div>
                     </div>
                 </div>
                </div>
            </div>
        )
        
     
    }
}
export default TJ