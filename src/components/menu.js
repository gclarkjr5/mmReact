import React, { Component } from 'react';
import { scaleRotate as Menu } from 'react-burger-menu'
import Bars from './chart';

class Burger extends Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {

    var styles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '26px',
        color: 'white'
      },
      bmBurgerBars: {
        background: '#373a47'
      },
      bmCrossButton: {
        height: '24px',
        width: '24px'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenu: {
        background: 'white',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
      },
      bmMorphShape: {
        fill: 'white'
      },
      bmItemList: {
        color: 'black',
        padding: '0.8em'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.2)'
      }
    }

    return (
      <div id="outer-container">
        <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} styles={styles}>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="http://www.ncaa.com/march-madness">NCAA</a>
          <a id="contact" className="menu-item" href="http://www.ncaa.com/interactive-bracket/basketball-men/d1">Bracket</a>
        </Menu>
        <main id="page-wrap">
          <Bars />
        </main>
      </div>
      /*<Menu styles={styles} >
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="http://www.ncaa.com/march-madness">NCAA</a>
        <a id="contact" className="menu-item" href="http://www.ncaa.com/interactive-bracket/basketball-men/d1">Bracket</a>
        <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
      </Menu>*/
    );
  }
}

export default Burger;