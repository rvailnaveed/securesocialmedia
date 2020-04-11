import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/Home"
import Error from "./components/Error"
import Navigation from "./components/Navigation"
import Group from "./components/Group";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/group" component={Group} exact/>
          <Route component={Error}/>
        </Switch>
      </div>
    </BrowserRouter>
    
  )
}

export default App;
