import React, { Component } from 'react';
import { Menu } from 'antd';
import {Route,Switch} from 'react-router-dom';
import Zy from '../components/Zy';
import Bsyx from '../components/Bsyx';
import Navbar from '../components/navbar'
class List extends Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
     state={
      selected:'zy'
     }
     componentDidMount(){
      this.props.history.push(this.props.match.path+"/"+this.state.selected);
    }
    handleClick(e){
      this.setState({
          selected:e.key
      },function(){
        this.props.history.push(this.props.match.path+"/"+this.state.selected);
      })
      
    }
    render(){
        let {selected} = this.state
        return(<div>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" selectedKeys={[selected]}>
        <Menu.Item style={{width:'50vw',textAlign:"center"}} key="zy">
          自营
        </Menu.Item>
        <Menu.Item style={{width:'50vw',textAlign:"center"}} key="bsyx">
          贝斯严选
        </Menu.Item>
        </Menu>
        <Switch>
        <Route path={this.props.match.path+"/zy"} component={Zy}/>
        <Route path={this.props.match.path+"/bsyx"} component={Bsyx}/>
        </Switch>
        <Navbar></Navbar>
        </div>)
    }
}
export default List;