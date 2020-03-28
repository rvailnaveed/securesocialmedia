import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/Home"
import Error from "./components/Error"
import Navigation from "./components/Navigation"
import Login from "./components/Login";
import User from "./components/User";
import Test from "./components/Test";
import Group from "./components/Group";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/test" component={Test} exact/>
          <Route path="/user" component={User} exact/>
          <Route path="/group" component={Group} exact/>
          <Route path="/login" exact component={Login} />
          <Route component={Error}/>
        </Switch>
      </div>
    </BrowserRouter>
    
  )
}

export default App;
