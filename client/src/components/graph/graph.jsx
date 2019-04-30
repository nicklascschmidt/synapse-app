import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './graph.css';

class Graph extends Component {
  render() {
    // console.log('graph -- this.props.chartData',this.props.chartData);
    return (
      <ResponsiveContainer height={400} width="90%">
        <BarChart width={600} height={300} data={this.props.chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis dataKey="date" name="Date" unit="" stroke="white" />
          <YAxis width={70} unit=" USD" stroke="white" />
          <Tooltip/>
          <Legend />
          <Bar dataKey="Entertainment" stackId="a" fill="#8884d8" />
          <Bar dataKey="FoodGroceries" stackId="a" fill="#82ca9d" />
          <Bar dataKey="HousingUtilities" stackId="a" fill="#23B5D3" />
          <Bar dataKey="PersonalCare" stackId="a" fill="#1C5D99" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default Graph;