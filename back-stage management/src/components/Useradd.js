import React,{Component}from "react";
import { Form, Input, Button } from 'antd';
import Api from "../api"

class Useradd extends Component{

    constructor() {
        super();
        this.state = {
        formLayout: 'horizontal',
        };

    }

    async handleSubmit(e){
        e.preventDefault();
        // console.log(e);
        let phone = this.props.form.getFieldValue('phone');
        let password = this.props.form.getFieldValue('password');
        let datas ={phone:phone,password:password};
        let data= await Api.add_user(datas);
        // console.log(data)
        if(data.code ===1){
            alert("successfully!")
        }
        
    }


    render(){
    const { formLayout } = this.state;
    const { getFieldProps } = this.props.form;
    const formItemLayout =
    formLayout === 'horizontal'
    ? {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
    }
    : null;
    const buttonItemLayout =
    formLayout === 'horizontal'
    ? {
    wrapperCol: { span: 14, offset: 4 },
    }
    : null;

    return(
        <div  style={{marginTop:50}}>
                <Form layout={formLayout} onSubmit={this.handleSubmit.bind(this)}>

                <Form.Item label="手机号" {...formItemLayout}>
                <Input placeholder="请输入ID"  {...getFieldProps('phone')}/>
                </Form.Item>

                <Form.Item label="密码" {...formItemLayout}>
                <Input placeholder="请输入密码" {...getFieldProps('password')} />
                </Form.Item>

                <Form.Item {...buttonItemLayout}>
                <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
                </Form>
        </div>
    )
    }
}
Useradd = Form.create({})(Useradd);
export default Useradd;

