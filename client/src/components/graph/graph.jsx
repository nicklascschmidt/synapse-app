import React, { PureComponent } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, Tooltip
} from 'recharts';
  
// static jsfiddleUrl = 'https://jsfiddle.net/alidingling/uLysj0u2/'; // reference

class Graph extends PureComponent {

  render() {
    return (
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <XAxis type="category" dataKey="date" name="Date" unit="" />
        <YAxis type="number" dataKey="amt" name="Amt" unit=" USD" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Transactions" data={this.props.chartData} fill="#61dafb" />
      </ScatterChart>
    );
  }
}

export default Graph;