import React from "react";
import {render} from "react-dom";
import {HashRouter,Switch,Route} from "react-router-dom";

import App from './App';
import Log from './components/Log'
render(
    <HashRouter>
        <Switch>
            <Route path="/app" component={App} ></Route>
            <Route path="/" component={Log} exact></Route>
        </Switch>
    </HashRouter>,
    document.getElementById('App')
)