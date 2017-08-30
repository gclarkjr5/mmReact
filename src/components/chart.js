import React, { Component } from 'react';
import {
    HighchartsChart, Chart, XAxis, YAxis, Title, Subtitle, Legend, BarSeries
} from 'react-jsx-highcharts';
import _ from 'lodash';

class Bars extends Component {
    constructor(props) {
        super(props)
        this.renderSeries = this.renderSeries.bind(this)
    }

    renderSeries({ name, data }) {
        return (
            <BarSeries id={name} name={name} key={name} data={data} />
        )
    }

    render() {
        const plotOptions = {
            series: {
                stacking: 'normal'
            }
        }

        return (
            <div className="app">
                <HighchartsChart
                    plotOptions={plotOptions}
                    colors={["#246987", "#768d99", "#a7a9ac", "#00AFD5", "#bed3e4", "#004990", "#cddc38"]}
                >
                    <Chart
                        inverted
                        height={700}
                        zoomType={'x'}
                        backgroundColor={`rgba(255, 255, 255, 0.1)`} />
                    <Legend
                        layout={'vertical'}
                        align={'right'}
                        verticalAlign={'middle'}
                        reversed={false}
                    />
                    <Title
                        style={{ color: `#000`, font: `bold 24px "Trebuchet MS", Verdana, sans-serif` }}
                    >NCAA MEN'S BASKETBALL TOURNAMENT</Title>

                    <Subtitle
                        style={{ color: `#666666`, font: `bold 16px "Trebuchet MS", Verdana, sans-serif` }}
                    >MARCH MADNESS 2017</Subtitle>

                    <XAxis id="x" categories={this.props.categories} />

                    <YAxis
                        id="number"
                        reversedStacks={false}
                        min={0}
                    >
                        <YAxis.Title>POINTS</YAxis.Title>
                        {_.map(this.props.data, this.renderSeries)}
                    </YAxis>
                </HighchartsChart>
            </div>
        );
    }
}

export default Bars;