import React, { Component } from 'react';
import { scaleRotate as Menu } from 'react-burger-menu'
import Bars from './chart';
import Slider from 'rc-slider';
import MM from '../MM.png';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import _ from 'lodash';

class Burger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      data: [],
      selections: [],
      sliderheight: 40,
      rounds: [
        `Round64`,
        `Round32`,
        `Sweet16`,
        `Elite8`,
        `Final4`,
        `CHAMPIONSHIP`
      ]
    }

    this.getInitialData = this.getInitialData.bind(this);
    this.getNewData = this.getNewData.bind(this);
  }

  componentDidMount = () => {
    this.getInitialData();
  }

  getInitialData = () => {
    axios.get(`/api/data`)
      .then(response => {
        this.setState({
          categories: response.data.categories,
          data: response.data.series,
          selections: response.data.selections
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getNewData = (value) => {
    axios.post(`/api/data`, { round: this.state.rounds[value] })
      .then(response => {
        this.setState({
          categories: response.data.categories,
          data: response.data.series,
          selections: response.data.selections
        })
      })
      .catch(err => {
        return {
          error: err
        }
      })
  }



  showSettings(event) {
    event.preventDefault();
  }

  render() {
    const { categories, data, selections } = this.state;

    const styles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        right: '36px',
        top: '26px',
        color: '#eaebed'
      },
      bmBurgerBars: {
        background: 'white'
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
        color: 'black'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.2)'
      }
    }

    let marks = {};
    _.forEach(this.state.rounds, (round, i) => {
      marks[i] = round
    })
    const sliderStyle = {
      width: `30%`,
      left: '30%',
      height: `${this.state.sliderheight}px`
    }


    return (
      <div id="outer-container">
        <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} styles={styles} right >
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="http://www.ncaa.com/march-madness">NCAA</a>
          <a id="contact" className="menu-item" href="http://www.ncaa.com/interactive-bracket/basketball-men/d1">Bracket</a>
        </Menu>
        <main id="page-wrap">
          <div className="container">
            <Bars
              categories={categories}
              data={data}
              selections={selections}
              sliderheight={this.state.sliderheight}
            />
            <Slider
              style={sliderStyle}
              min={0}
              max={5}
              marks={marks}
              defaultValue={5}
              onAfterChange={this.getNewData}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default Burger;