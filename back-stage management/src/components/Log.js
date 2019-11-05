import React, { Component } from 'react';
import { Form, Icon, Input, Button,Layout,message } from 'antd';
import Api from '../api';
const {  Content } = Layout;
class Log extends Component{
    adlog=async ()=>{
        let adname = document.getElementsByClassName('ant-input')[0].value;
        let password = document.getElementsByClassName('ant-input')[1].value;
        if(adname.trim()||password.trim()){
           let result = await Api.bsk.post('/ad/log',{adname,password})
           if(result.data.code){//登录成功
            localStorage.adname=adname;
               this.props.history.push('/app')
           }else{
            alert('账号密码有误！')
           }
        }else{
            alert('please 填完登录信息！ ok？')
        }
        
    }
    forgetpsw=()=>{
        message.warning('忘记密码？如果你在2030年前，加微信:super超人,在2030年之后就别找我了!');
    }
    render(){
        return(<div>
            <Layout>
            <Content style={{display:'flex',justifyContent:'center',alignItems:'center', width:'100vw',height:'100vh',backgroundImage:`url('../assest/timg1.jpg')`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
    <div style={{width:'40vw',height:'35vh'}}>
                <h3 style={{textAlign:'center',fontSize:'2vw',fontWeight:'700',color:'#58bc58'}}>贝斯客管理系统登录</h3>
        <div style={{padding:'1vw 8vw'}}>
            <Form style={{textAlign:'center'}}  className="login-form">
                <Form.Item>
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="password"
                    />
                </Form.Item >
                <Form.Item  style={{display:'flex',justifyContent:'center'}}>
                <Button onClick={this.adlog} type="primary"  className="login-form-button">
                    登录
                </Button>
                </Form.Item>
                <a onClick={this.forgetpsw} style={{marginLeft:'1vw',color:'#fff'}}>忘记密码？</a>
            </Form>    
      </div>
      </div>
             </Content>
            </Layout>
        </div>)
    }
}

export default Log;