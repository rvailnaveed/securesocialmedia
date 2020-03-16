import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/Home"
import Error from "./components/Error"
import Navigation from "./components/Navigation"
import Login from "./components/Login";


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation/>
        <Switch>
          <Route path="/"component={Home} exact/>
          <Route path="/login" exact component={Login} />
          <Route component={Error}/>
        </Switch>
      </div>
    </BrowserRouter>
    
  )
}

export default App;
