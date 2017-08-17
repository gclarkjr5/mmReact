import React, { Component } from 'react';
// Note that Highcharts has to be required separately
import ReactHighcharts from 'react-highcharts';


var config = {
    chart: {
        type: 'bar',
    },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania']
    },
    series: [{
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
    }, {
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
    }, {
        name: 'Year 2012',
        data: [1052, 954, 4250, 740, 38]
    }]
};

class Bars extends Component {

    render() {
        return (
            <ReactHighcharts
                config={config}
            />
        )
    }
}

export default Bars;