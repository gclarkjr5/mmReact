import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Burger from './components/menu'

class App extends Component {
  render() {

    const marks = [
      `Round64`,
      `Round32`,
      `Sweet16`,
      `Elite8`,
      `Final4`,
      `CHAMPIONSHIP`
    ]
    return (
      <div className="App">
        <Burger 
          rounds={marks}
        />
      </div>
    );
  }
}

export default App;
