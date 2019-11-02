import React,{Component} from 'react';
import 'antd/dist/antd.css';
import {Switch,Route,Redirect} from 'react-router-dom';
import { Layout,Icon,PageHeader,Button,Modal } from 'antd';
const { confirm } = Modal;
import Panhu from './components/panhu';
import Nav from './components/Nav';
import './css/index.scss';
const { Header, Sider, Content } = Layout;
import Useradd from './components/Useradd';
import Useredit from './components/Useredit';
import Goodshow from './components/Goodshow';
import Goodsfixed from './components/Goodsfixed';
import Goodsadd from './components/Goodsadd';
import Order from './components/Order';
import Cart from './components/Cart';

class App extends Component{
  constructor(){
    super();
    this.showConfirm = this.showConfirm.bind(this)
  }
      state={
        collapsed: false,
        navlist:[
            {
                class:'用户管理',
                menu:[
                    {
                        title:'用户添加',
                        component:Useradd,
                        path:'/useradd'
                    },
                    {
                        title:'用户编辑',
                        component:Useredit,
                        path:'/useredit'
                    }
                ],
                icon:"user"
            },
            {
                class:'商品管理',
                menu:[
                    {
                        title:'商品查看',
                        component:Goodshow,
                        path:'/goodshow'
                    },
                    {
                        title:'商品信息修改',
                        component:Goodsfixed,
                        path:'/goodsfixed'
                    },
                    {
                        title:'商品添加',
                        component:Goodsadd,
                        path:'/goodsadd'
                    }
                ],
                icon:'shop'
            },
            {
                class:'订单管理',
                menu:[
                    {
                        title:'查看订单',
                        component:Order,
                        path:'/order'
                    },
                    {
                        title:'查看购物车',
                        component:Cart,
                        path:'/cart'
                    }
                ],
                icon:'file'
            }
        ],
        adname:localStorage.adname?localStorage.adname:''
    }
    componentDidMount(){
      // let adname = this.state.adname;
      // if(adname){//有登陆
      //   document.getElementsByClassName('h5')[0].innerHTML = adname;
      // }else{//没登录
      //   document.getElementsByClassName('h5')[0].innerHTML="没登录！瞧不起我胖虎？"
      // }
    }
    showConfirm() {//退出
      let clearadname=()=>{
        this.setState({
          adname:''
        })
      }
      confirm({
        title: '您确定要退出？',
        content: '退出后您将无法操作管理系统!',
        onOk(){
         localStorage.removeItem('adname');
         clearadname();
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
    golog=()=>{//去登录
      this.props.history.push('/')
    }
    toggle = () => {
        let ph = document.getElementsByClassName('h5')[0];
        ph.innerHTML = parseInt(getComputedStyle(ph,false).width)>100?'虎':this.state.adname?this.state.adname:"没登录！瞧不起我胖虎？";
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    render(){
        let{navlist,adname}=this.state;
        let nowpath = this.props.match.path;
        return (
            <Layout>
            <Sider style={{overflow:'hidden'}} trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className='side-navbar mCustomScrollbar _mCS_1'>
            <div id='mCSB_1' className='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside'>
                     <div id='mCSB_1_container' className='mCSB_container'>
                         <div className='side-navbar-wrapper'>
                            <Panhu adname={adname}></Panhu>
                         </div>
                         <Nav navlist={{navlist,nowpath}} ></Nav>
                     </div>
                 </div>
                 </div>
              </Sider>
            <Layout>
              <Header style={{ background: '#66ccff', padding: 0 ,display:'flex',alignItems:'center'}}>
                <Icon
                  className="trigger"
                  style={{fontSize:'2vw',marginLeft:'2vw',color:'#fff',lineHeight:'64px'}}
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                  <PageHeader
                    style={{
                    lineHeight:'100%',
                    flex:'1',
                    fontSize:'2vw'
                    }}
                    title="贝斯客后台管理系统"
                    subTitle="只为更好的烘焙的烘焙商家的管理系统"
                />
                {
                 this.state.adname!=''? (<Button icon='logout' style={{marginRight:'3vw',backgroundColor:'#66ccff',color:'#000',border:'none'}} onClick={this.showConfirm}>退出</Button>): (<Button icon='login' style={{marginRight:'3vw',backgroundColor:'#66ccff',color:'#000',border:'none'}} onClick={this.golog}>登录</Button>)
                }
               
              </Header>
           
              <Content
                style={{
                  background: '#fff',
                  minHeight: 280,
                }}
              >
                 {
                this.state.adname!=''?(  <Switch>
                  {
                    navlist.map(item=>{
                      return ( item.menu.map((item2,idx2)=>{
                          return(
                              <Route key={idx2} path={nowpath+item2.path} component={item2.component}/>
                            )
                        }))
                    })
                  }
              </Switch>):<h1>胖虎:大雄,请去登录！</h1>
              }
              </Content>
            </Layout>
          </Layout> 
        )
    }
}
export default App;