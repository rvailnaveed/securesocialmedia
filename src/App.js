import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./components/Home"
import Error from "./components/Error"
import Navbar from "./components/Navbar"

function App() {
  return (
    <main>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route component={Error} />
      </Switch>
    </main>
  )
}

export default App;
