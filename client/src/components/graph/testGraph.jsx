import React from 'react';
import {
  ScatterChart, Scatter,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import './graph.css';

export default class TestGraph extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fake: [
        {fullDate: 1556561124685, date: "Apr 29th 19", amt: 18},
        {fullDate: 1556568310280, date: "Apr 29th 19", amt: 15},
        {fullDate: 1556577732520, date: "Apr 29th 19", amt: 12},
      ],
      chartData: null,
      initialChartData: [
        { amount: { amount: 17 }, extra: { created_on: 1556594294898, group_id: "Entertainment", note: "TEST: new" }},
        { amount: { amount: 37 }, extra: { created_on: 1556594150835, group_id: "Housing & Utilities", note: "TEST: new" }},
        { amount: { amount: 4 }, extra: { created_on: 1556594000000, group_id: "Personal Care", note: "TEST: new" }},
        { amount: { amount: 18 }, extra: { created_on: 1556593000000, group_id: "Entertainment", note: "TEST: new" }},
        { amount: { amount: 5 }, extra: { created_on: 1556592000000, group_id: "Personal Care", note: "TEST: new" }},
        { amount: { amount: 3 }, extra: { created_on: 1556500000000, group_id: "Personal Care", note: "TEST: new" }},
        { amount: { amount: 17 }, extra: { created_on: 1556000000000, group_id: "Food & Groceries", note: "TEST: new" }},
        { amount: { amount: 23 }, extra: { created_on: 1556500000000, group_id: "Food & Groceries", note: "TEST: new" }},
        { amount: { amount: 35 }, extra: { created_on: 1556700000000, group_id: "Food & Groceries", note: "TEST: new" }},
      ],
      wantFormat: [
        {date: "Apr 29th 19", Entertainment: 18, PersonalCare: 11, fullDate: 1556577732520 },
      ],
    }
  }

  // Build simple array of date strings. Build array of objs with date property.
  // Add category properties and fullDate to dateObjectArray. Sort array and update state.
  componentDidMount = () => {
    let uniqueDateArray = this.buildUniqueDateArray(this.state.initialChartData);
    let dateObjectArray = this.buildArrayOfDateObjects(uniqueDateArray);
    let fullArray = this.addKeysToDateArray(this.state.initialChartData,uniqueDateArray,dateObjectArray);
    let sortedArray = this.sortArray(fullArray);
    this.setState({ chartData: sortedArray });
  }

  buildUniqueDateArray = (array) => {
    return [...new Set(array.map(obj => {
      let date = moment(obj.extra.created_on).format("MMM Do YY");
      return date
    }))];
  }

  buildArrayOfDateObjects = (array) => {
    let newArray = [];
    for (let i=0; i<array.length; i++) {
      newArray.push({
        date: array[i],
        Entertainment: 0,
        HousingUtilities: 0,
        PersonalCare: 0,
        FoodGroceries: 0,
      });
    }
    return newArray
  }

  // Save values from the initialArray (big obj of resp.data).
  // Get index of the date from the simple date array.
  // Add the amount for each category key - (messy, ran into trouble updating dynamic property w/o overwriting obj (with date property))
  addKeysToDateArray = (initialArray,dateArray,buildArray) => {
    for (let i=0; i<initialArray.length; i++) {
      let obj = initialArray[i];
      let fullDate = obj.extra.created_on;
      let date = moment(fullDate).format("MMM Do YY");
      let groupId = obj.extra.group_id;
      let amount = obj.amount.amount;

      let indexOfDate = dateArray.indexOf(date);

      buildArray[indexOfDate].fullDate = fullDate;

      if (groupId === 'Entertainment') {
        buildArray[indexOfDate].Entertainment += amount;
      } else if (groupId === 'Housing & Utilities') {
        buildArray[indexOfDate].HousingUtilities += amount;
      } else if (groupId === 'Personal Care') {
        buildArray[indexOfDate].PersonalCare += amount;
      } else if (groupId === 'Food & Groceries') {
        buildArray[indexOfDate].FoodGroceries += amount;
      } else {
        // this shouldn't hit
      }
    }
    return buildArray
  }

  sortArray = (array) => {
    return array.sort(function(a, b) {
      let keyA = (a.fullDate);
      let keyB = (b.fullDate);
      return keyA - keyB;
    });
  }

  render() {
    return (
      <ResponsiveContainer height={400} width="90%">
        <BarChart width={600} height={300} data={this.state.chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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
  
// static jsfiddleUrl = 'https://jsfiddle.net/alidingling/uLysj0u2/'; // reference

const whatever = () => {
  return (
    <ResponsiveContainer height={400} width="90%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis type="category" dataKey="date" name="Date" unit="" stroke="white" />
        <YAxis type="number" dataKey="amt" name="Amt" unit=" USD" stroke="white" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Transactions" data={this.props.chartData} fill="#61dafb" />
      </ScatterChart>
    </ResponsiveContainer>
    )
}
