import React, { Component } from 'react';
// Note that Highcharts has to be required separately
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';
import _ from 'lodash';

class Bars extends Component {

    // componentDidMount = () => {
    //     this.setSeries();
    // }

    // setSeries = () => {
    //     axios.get(`/api/data`)
    //         .then(response => {
    //             this.props.config.xAxis.categories = response.data.categories
    //             this.props.config.series = response.data.series
    //             this.setState({
    //                 config: this.props.config
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    render() {

        const getData = () => {
            axios.get(`/api/data`)
                .then(response => {
                    this.props.config.xAxis.categories = response.data.categories
                    this.props.config.series = response.data.series
                    // this.props.config
                })
                .catch(err => {
                    console.log(err)
                })
        }

        getData()
        // this.props.config = _.isUndefined(this.props.config.series) ? getData() : this.props.config

        this.props.config.xAxis.categories = _.isUndefined(this.props.data) ? this.props.config.xAxis.categories : this.props.data.categories;
        this.props.config.series = _.isUndefined(this.props.data) ? this.props.config.series : this.props.data.series

        // console.log(ReactHighcharts.Highcharts.getOptions())

        return (
            <ReactHighcharts
                config={this.props.config}
                ref="chart"
            />
        )
    }
}

export default Bars;