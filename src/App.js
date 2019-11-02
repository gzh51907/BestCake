import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom' //引入withRouter
import Home from "@/pages/home";
import Cart from "@/pages/cart/index";
import List from "@/pages/list";
import Mine from "@/pages/mine/index";
import Detail from "@/components/detailPage";
import Order from './pages/order';
import Gshow from '@/components/goodshow';
class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/goods" component={Gshow} />
                    <Route path="/home" component={Home} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/list" component={List} />
                    <Route path="/mine" component={Mine} />
                    <Route path="/order" component={Order}/>
                    <Route path="/detail" component={Detail} />
                    <Redirect from="/" to="/goods" exact />
                    {/* <Redirect from="/" to="/home" exact /> */}
                </Switch>
            </div>
        )
    }
}
App = withRouter(App)
export default App;