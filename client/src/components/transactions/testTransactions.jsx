import moment from 'moment';

const testTransactions = [
  {
    amt: '3',
    fullDate: 1555348702719,
    date: moment(1555348702719).format("MMM Do YY")
  },
  {
    amt: '6',
    fullDate: Date.now(),
    date: moment(Date.now()).format("MMM Do YY")
  },
];

export default testTransactions;