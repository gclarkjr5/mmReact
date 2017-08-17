import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bars from './components/chart'
import { bubble as Menu } from 'react-burger-menu'
import Example from './components/menu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          I am started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Example />
        {/*<Bars />*/}
      </div>
    );
  }
}

export default App;
