import React, { Component } from 'react';
import { Icon,Button,message } from 'antd';
class Adress extends Component{
    state={
        formlist:[
            {
                name:'联系人',
                placeholder:'请填写收货人姓名',
                value:''
            },
            {
                name:'联系电话',
                placeholder:'请填写收货人联系方式',
                value:''
            },
            {
                name:'所在城市',
                placeholder:'请填写收货人所在城市',
                value:''
            },
            {
                name:'收货地址',
                placeholder:'请填写收货地址',
                value:''
            },
            {
                name:'门牌号',
                placeholder:'请输入详细地址，例:5号三楼203室',
                value:''
            }
        ]
    }
    changevalue=(idx,event)=>{
         let {formlist} = this.state;
         formlist[idx].value = event.target.value;
         this.setState({
             formlist
         })
    }
    back=()=>{
        document.getElementsByClassName('adress')[0].style.display='none'
    }
     info = () => {
        let{formlist} =this.state;
        let p=[] ;
        formlist.forEach(i=>{
            if(i.value.trim()==''){
                p.push(i)
            }
        })
        
        if(p.length==0){
            document.getElementsByClassName('adress')[0].style.display='none',
            this.props.getsdress({
                phone:formlist[1].value,
                name:formlist[0].value,
                city:formlist[2].value,
                adress:formlist[3].value,
                door:formlist[4].value,
                isok:true
            })
        }
        else{
            message.info(p[0].placeholder);
            document.getElementsByClassName('outer-mask')[0].style.display='block';
        }
        
      };
    render(){
        let {formlist} = this.state;
        return(
            <div className='adress'>
              <div className='public-top-main'>
                  <div onClick={this.back} className="btn">
                  <Icon type="left" />
                  </div>
              </div>
              <div className='mw-add-main'>
              <div  className='am-u-sm-12 clplr form_div'>
                  {
                      formlist.map((i,idx)=>{
                          return (
                        
                            <div key={idx} className='am-u-sm-12 clplr'>
                            <div className='form_name'>
                                {i.name}
                            </div>
                            <input type='text'value={i.value} onChange={this.changevalue.bind(this,idx)} className='form_input' placeholder={i.placeholder}maxLength='40'></input>
                            </div>
                   
                          )
                      })
                  }
                <Button  onClick={this.info} style={{marginTop:'10vw'}} type="primary" size="large"  block>
                    保存
                </Button>
                   </div>
                 
              </div>
              
            </div>
        )
    }
}
export default Adress;