import React, { Component } from 'react';
// Note that Highcharts has to be required separately
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';
import _ from 'lodash';

class Bars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            config: {
                colors: ["#246987", "#768d99", "#a7a9ac", "#00AFD5", "#bed3e4", "#004990", "#cddc38"],
                chart: {
                    height: 750,
                    backgroundColor: {
                        linearGradient: [0, 0, 0, 0],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(240, 240, 255)']
                        ]
                    },
                    type: 'bar',
                    // backgroundColor: `rgba(255, 255, 255, 0.1)`,
                    animation: true
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
                // legend: {
                //     itemStyle: {
                //         font: '9pt Trebuchet MS, Verdana, sans-serif',
                //         color: 'black'
                //     },
                //     itemHoverStyle: {
                //         color: 'gray'
                //     },
                //     layout: 'vertical',
                //     align: 'right',
                //     verticalAlign: 'middle'
                // },
                xAxis: {
                    categories: {}
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'POINTS'
                    },
                    reversedStacks: false
                },
                legend: {
                    reversed: false,
                    itemStyle: {
                        color: `#ffffff`
                    }
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        borderColor: `#000000`,
                        pointWidth: 12
                    }
                },
                series: {}
            }
        }
    }

    componentDidMount = () => {
        this.setSeries();
    }

    setSeries = () => {
        axios.get(`http://localhost:5000/api/data`)
            .then(response => {

                // this.setState({
                //     config: _.set(this.state.config.xAxis.categories, _.map(response.data.categories, x => {
                //         return x
                //     }))
                // })
                // this.setState({
                //     config: _.set(this.state.config.series, _.map(response.data.series, x => {
                //         return x
                //     }))
                // })
                this.state.config.xAxis.categories = response.data.categories
                this.state.config.series = response.data.series
                this.setState({
                    config: this.state.config
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {

        return (
            <ReactHighcharts
                config={this.state.config}
            />
        )
    }
}

export default Bars;