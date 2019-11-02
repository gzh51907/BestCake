import React,{Component} from 'react';
import {Icon,Menu} from 'antd';
import {withRouter} from 'react-router-dom';
const { SubMenu } = Menu

@withRouter
class Nav extends Component {
    constructor(){
        super();
        this.goto= this.goto.bind(this);
        
    }

 goto =(path)=>{
   this.props.history.push(this.props.navlist.nowpath+path);
 } 
    render() {
        let navlist = this.props.navlist.navlist;
      return (
        <div style={{ width: 256 }}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            style={{backgroundColor:'#393836',borderBottom:'#000'}}
            theme='dark'
          >
              {
                 navlist.map((item,idx)=>{
                     return(
                        <SubMenu
                        key={idx}
                        title={
                          <span>
                            <Icon type={item.icon} />
                            <span>{item.class}</span>
                          </span>
                        }
                      >
                          {
                              item.menu.map((item2)=>{
                                  return(
                                    <Menu.Item onClick={this.goto.bind(this,item2.path)}  key={item2.path}>{item2.title}</Menu.Item>
                                  )
                              })
                          }
                        
                      </SubMenu>
                     )
                 })
              }
            
          </Menu>
        </div>
      );
    }
  }
export default Nav