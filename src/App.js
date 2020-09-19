import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './home';
import Generator from './generator';
import Footer from './footer';


function App() {
  return (

    <BrowserRouter>
    <div className="App">
      <Route exact path="/generator" component={Generator}/>
      <Route exact path="/:i" component={Home}/>
      <Route exact path="/" component={Home}/>

      <Footer />
    </div>

    </BrowserRouter> 

  );
}

export default App;
