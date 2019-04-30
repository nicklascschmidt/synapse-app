import React, { PureComponent } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import './graph.css';
  
// static jsfiddleUrl = 'https://jsfiddle.net/alidingling/uLysj0u2/'; // reference

class Graph extends PureComponent {

  render() {
    console.log('this.props.chartData',this.props.chartData);
    return (
      <ResponsiveContainer height={400} width="90%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis type="category" dataKey="date" name="Date" unit="" stroke="white" />
          <YAxis type="number" dataKey="amt" name="Amt" unit=" USD" stroke="white" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Transactions" data={this.props.chartData} fill="#61dafb" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}

export default Graph;