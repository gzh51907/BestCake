import React, { Component } from "react";
import 'antd/dist/antd.css';
import Navbar from "@/components/navbar";
import { Switch, Route, Redirect } from 'react-router-dom' //引入withRouter
import Home from "@/pages/home"
import Cart from "@/pages/cart"
import List from "@/pages/list"
import Mine from "@/pages/mine"


class App extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/list" component={List} />
                    <Route path="/mine" component={Mine} />
                    <Redirect from="/" to="/home" exact />
                </Switch>
                <Navbar />
            </div>
        )
    }
}

export default App;