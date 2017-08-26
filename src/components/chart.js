import React, { Component } from 'react';
// Note that Highcharts has to be required separately
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';

class Bars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            config: {
                colors: ["#246987", "#768d99", "#a7a9ac", "#00AFD5", "#bed3e4", "#004990", "#cddc38"],
                chart: {
                    height: 725,
                    zoomType: `x`,
                    type: 'bar',
                    backgroundColor: `rgba(255, 255, 255, 0.1)`,
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
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
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
        axios.get(`/api/data`)
            .then(response => {
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