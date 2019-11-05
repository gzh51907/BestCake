import React from "react";
import {render} from "react-dom";
import {BrowserRouter,Switch,Route} from "react-router-dom";

import App from './App';
import Log from './components/Log'
render(
    <BrowserRouter>
        <Switch>
            <Route path="/app" component={App} ></Route>
            <Route path="/" component={Log} exact></Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById('App')
)