import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bars from './components/chart'
// import { slide as Menu } from 'react-burger-menu'
import Burger from './components/menu'

class App extends Component {
  render() {

    

    return (
      <div className="App">
        <Burger />
        <Bars />
      </div>
    );
  }
}

export default App;
