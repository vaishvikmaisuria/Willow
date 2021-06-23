import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: '2017',
    you: 4000,
    sp500: 2400,
  },
  {
    name: '2018',
    you: 4000,
    sp500: 2400,
  },
  {
    name: '2019',
    you: 4000,
    sp500: 2400,
  },
  {
    name: '2020',
    you: 4000,
    sp500: 2400,
  },
  {
    name: '2021',
    you: 4000,
    sp500: 2400,
  },
  {
    name: '2022',
    you: 3000,
    sp500: 1398,
  },
  {
    name: '2023',
    you: 2000,
    sp500: 9800,
  },
  {
    name: '2024',
    you: 2780,
    sp500: 3908,

  },
  {
    name: '2025',
    you: 1890,
    sp500: 4800,

  },
  {
    name: '2026',
    you: 2390,
    sp500: 3800,

  },
  {
    name: '2027',
    you: 3490,
    sp500: 4300,
 
  },
  {
    name: '2028',
    you: 3490,
    sp500: 4300,
 
  },
  {
    name: '2029',
    you: 3490,
    sp500: 4300,
 
  },
  {
    name: '2030',
    you: 3490,
    sp500: 4300,
 
  }
];

export default function StockGraph () {

    return (
     
        <LineChart
          width={700}
          height={550}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 25,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sp500" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="you" stroke="#82ca9d" />
        </LineChart>
     
    );
}
