import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
class Log extends Component{
    render(){
        return(<div>
            <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
            </Layout>
        </div>)
    }
}
export default Log;