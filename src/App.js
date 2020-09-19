import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './home';
import Generator from './generator';
import Footer from './footer';


function App() {
  console.log(document.location);
  return (

    <BrowserRouter>
    <div className="App">
      <Route path="/generator" component={Generator}/>
      <Route path="/:i" component={Home}/>

      <Footer />
    </div>

    </BrowserRouter> 

  );
}

export default App;
