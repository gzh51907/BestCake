import React, { Component } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
class BZ extends Component{
    onChange=(event)=>{
        document.getElementById('bz').innerHTML=event.target.value.trim()?event.target.value:'请填写';
    }
    closebz=()=>{
        document.body.removeEventListener('touchmove',this.bodyscrool,{ passive: false });
        document.getElementsByClassName('outer-mask')[0].style.display = 'none';
         document.getElementsByClassName('bz_list')[0].style.display='none';
    }
    render(){
          return(
        <div className="bz_list remark_list outer_1DxCK">
            <h3>添加备注<a onClick={this.closebz}>完成</a></h3>
            <div className="inner" style={{padding:'4vw 5.333333vw'}}>
                <TextArea onChange={this.onChange} maxLength='20'  style={{width:'100%',height:'20vw',padding:'0',fontSize:'3.73vw',border:'none'}} rows={4} />
            </div>
            <div className='card-line-1DfUC'></div>
        
        </div>
    ) 
    }
 
}
export default BZ;