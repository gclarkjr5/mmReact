import React, { Component } from 'react';
import './App.css';
import Burger from './components/menu'

class App extends Component {
  render() {
    return (
        <div className="App">
          <Burger />
        </div>

    );
  }
}

export default App;
