import React, { Component } from 'react';
import { scaleRotate as Menu } from 'react-burger-menu'
import Bars from './chart';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

class Burger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hchartData: undefined
    }
  }

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    const config = {
      colors: ["#246987", "#768d99", "#a7a9ac", "#00AFD5", "#bed3e4", "#004990", "#cddc38"],
      chart: {
        height: 700,
        zoomType: `x`,
        type: 'bar',
        backgroundColor: `rgba(255, 255, 255, 0.1)`
      },
      title: {
        text: `NCAA MEN'S BASKETBALL TOURNAMENT`,
        style: {
          color: `#ffffff`
        },
        style: {
          color: '#000',
          font: 'bold 24px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      subtitle: {
        text: `MARCH MADNESS 2017`,
        style: {
          color: `#ffffff`
        },
        style: {
          color: '#666666',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      xAxis: {
        categories: undefined
      },
      yAxis: {
        min: 0,
        title: {
          text: 'POINTS'
        },
        reversedStacks: false
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          borderColor: `#000000`,
          pointWidth: 12,
          animation: {
            duration: 2000
          }
        }
      },
      series: undefined
    }

    const styles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        right: '36px',
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
        color: 'black'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.2)'
      }
    }

    const marks = {
      0: this.props.rounds[0],
      1: this.props.rounds[1],
      2: this.props.rounds[2],
      3: this.props.rounds[3],
      4: this.props.rounds[4],
      5: this.props.rounds[5]
    }
    const sliderStyle = {
      width: '350px',
      left: '35%'
    }

    const changeData = (value) => {
      axios.post(`/api/data`, { round: this.props.rounds[value] })
        .then(response => {
          this.setState({
            hchartData: response.data
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

    return (
      <div id="outer-container">
        <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} styles={styles} right >
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="http://www.ncaa.com/march-madness">NCAA</a>
          <a id="contact" className="menu-item" href="http://www.ncaa.com/interactive-bracket/basketball-men/d1">Bracket</a>
        </Menu>
        <main id="page-wrap">
          <div>
            <Bars
              /*data={this.state.hchartData}*/
            />
            <Slider
              style={sliderStyle}
              min={0}
              max={5}
              marks={marks}
              defaultValue={5}
              /*onAfterChange={changeData}*/
            />
          </div>
        </main>
      </div>
    );
  }
}

export default Burger;