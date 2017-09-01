import React, { Component } from 'react';
import {
    HighchartsChart, Chart, XAxis, YAxis, Title, Subtitle, Legend, BarSeries, Tooltip
} from 'react-jsx-highcharts';
import _ from 'lodash';
import MM from '../MM.png';

class Bars extends Component {
    render() {
        const plotOptions = {
            series: {
                stacking: 'normal',
                borderColor: `#000000`,
                pointWidth: 10
            }
        }

        const renderSeries = ({ name, data }) => {
            return (
                <BarSeries id={name} name={name} key={name} data={data} />
            )
        }

        const selfData = this.props.selections;
        const formatter = function () {
            const dataObj = _.find(selfData, x => {
                return x.Name === `${this.key}`
            })
            let FinalFour = dataObj.Final4.join().replace(/,/g, `, `)
            let Top2 = dataObj.Top2.join().replace(/,/g, `, `)
            let Champion = dataObj.Champ.join().replace(/,/g, `, `)
            let TP = dataObj.TotalPoints
            let GC = dataObj.TotalCorrect
            let PR = _.isNull(dataObj.PtsRemain) ? 0 : dataObj.PtsRemain;
            var tooltip = `<b>${this.key}</b><br>
                            <b>${this.series.name}: ${this.y}<b><br>
                            Final Four: ${FinalFour}<br>
                            Top 2: ${Top2}<br>
                            Champion: ${Champion}<br>
                            Games Correct: ${GC}<br>
                            Total Pts: ${TP}<br>
                            Max Points Remaining: ${PR}`
            return tooltip;
        }
        const self = this;
        let imageRendered = false;
        const addImage = function() {
            imageRendered ? true : this.renderer.image(MM, window.innerWidth - 250, window.innerHeight - (self.props.sliderheight * 10), 200, 200).add();
            imageRendered = true;
        }
        return (
            <div className="app">
                <HighchartsChart
                    plotOptions={plotOptions}
                    colors={["#246987", "#768d99", "#a7a9ac", "#00AFD5", "#bed3e4", "#004990", "#cddc38"]}
                >
                    <Chart
                        inverted
                        height={window.innerHeight - this.props.sliderheight}
                        zoomType={'x'}
                        backgroundColor={`rgba(255, 255, 255, 0)`}
                        onRender={addImage}
                    />

                    <Legend
                        /*layout={'vertical'}
                        align={'right'}
                        verticalAlign={'middle'}*/
                        reversed={false}
                        itemStyle={{ color: '#666666' }}
                        itemHoverStyle={{ color: '#bcbaba' }}
                    />
                    <Title
                        style={{ color: '#eaebed', font: `bold 24px "Trebuchet MS", Verdana, sans-serif` }}
                    >NCAA MEN'S BASKETBALL TOURNAMENT</Title>

                    <Subtitle
                        style={{ color: `#666666`, font: `bold 16px "Trebuchet MS", Verdana, sans-serif` }}
                    >MARCH MADNESS 2017</Subtitle>

                    <Tooltip
                        padding={10}
                        hideDelay={250}
                        shape="square"
                        split
                        shared={false}
                        formatter={formatter}
                    />


                    <XAxis id="x" categories={this.props.categories} />

                    <YAxis
                        id="number"
                        reversedStacks={false}
                        min={0}
                    >
                        <YAxis.Title>POINTS</YAxis.Title>
                        {_.map(this.props.data, renderSeries)}
                    </YAxis>
                </HighchartsChart>
            </div>
        );
    }
}

export default Bars;