import React, { Component } from 'react';
import {
    HighchartsChart, Chart, XAxis, YAxis, Title, Subtitle, Legend, BarSeries
} from 'react-jsx-highcharts';
import axios from 'axios';
import _ from 'lodash';

class Bars extends Component {
    render() {
        const plotOptions = {
            series: {
                stacking: 'normal'
            }
        }

        const getData = () => {
            axios.get(`/api/data`)
                .then(response => {
                    this.props.data = response.data
                    console.log(this.props.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        getData();

        // let categories = _.isUndefined(this.props.data) ? [] : this.props.data.categories;

        return (
            <div className="app">
                <HighchartsChart plotOptions={plotOptions} >
                    <Chart
                        inverted
                        height={700}
                        zoomType={'x'}
                        backgroundColor={`rgba(255, 255, 255, 0.1)`} />
                    <Legend />
                    <Title
                        style={{ color: `#000`, font: `bold 24px "Trebuchet MS", Verdana, sans-serif` }}
                    >NCAA MEN'S BASKETBALL TOURNAMENT</Title>

                    <Subtitle
                        style={{ color: `#666666`, font: `bold 16px "Trebuchet MS", Verdana, sans-serif` }}
                    >MARCH MADNESS 2017</Subtitle>

                    <XAxis id="x" />

                    <YAxis id="number">
                        <BarSeries id="jane" name="Jane" data={[3, 2, 1, 3, 4]} />
                        <BarSeries id="john" name="John" data={[2, 3, 5, 7, 6]} />
                        <BarSeries id="joe" name="Joe" data={[4, 3, 3, 9, 9]} />
                    </YAxis>
                </HighchartsChart>
            </div>
        );
    }
}

export default Bars;