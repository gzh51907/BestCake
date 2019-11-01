import React,{Component}from "react";
import 'antd/dist/antd.css';
import {Switch,Route} from 'react-router-dom'
import List from './pages/list';
import Order from './pages/order';
class App extends Component{
    render(){
        return(
            <div>
              <Switch>
                  <Route path="/list" component={List}/>
                  <Route path="/order" component={Order}/>
              </Switch>
            </div>
        )
    }
}
export default App;