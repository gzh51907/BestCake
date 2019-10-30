import React,{Component}from "react";

class App extends Component{
    render(){
        return(
            <div>
              <Switch>
                  <Router path='/home' compoment={}></Router>
                  <Router path='/list' compoment={}></Router>
                  <Router path='/cart' compoment={}></Router>
                  <Router path='/mine' compoment={}></Router>
                  <Redirect to="home" from='/'></Redirect>
              </Switch>
            </div>
        )
    }
}
export default App;