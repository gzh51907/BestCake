import React from "react";
import {render} from "react-dom";
import {HashRouter,Route} from 'react-router-dom';
import App from "./App"

render(
    <HashRouter>
        <App/>
    </HashRouter>
    ,
    document.getElementById('App')
)

