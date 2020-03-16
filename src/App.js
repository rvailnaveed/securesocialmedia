import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/Home"
import Error from "./components/Error"
import Navigation from "./components/Navigation"

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">Demo</h3>

        <Navigation/>
        <Switch>
          <Route path="/"component={Home} exact/>
          <Route component={Error}/>
        </Switch>
      </div>
    </BrowserRouter>
    
  )
}

export default App;
