import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: '2017',
    you: 0,
    sp500: 2278.87,
    inflation: 0,
  },
  {
    name: '2018',
    you: 0,
    sp500: 2673.81,
    inflation: 0,
  },
  {
    name: '2019',
    you: 0,
    sp500: 2704.10,
    inflation: 0,
  },
  {
    name: '2020',
    you: 0,
    sp500: 3225.52,
    inflation: 0,
  },
  {
    name: '2021',
    you: 4000,
    sp500: 3714.24,
    inflation: 4000,
  },
  {
    name: '2022',
    you: 4000,
    sp500: 4085.66,
    inflation: 4140,
  },
  {
    name: '2023',
    you: 4000,
    sp500: 4494.23,
    inflation: 4284.9,
  },
  {
    name: '2024',
    you: 4000,
    sp500: 4943.65,
    inflation: 4434.8715,
  },
  {
    name: '2025',
    you: 4000,
    sp500: 5438.01,
    inflation: 4590.092003,
  },
  {
    name: '2026',
    you: 4000,
    sp500: 5981.81,
    inflation: 4750.745223,
  },
  {
    name: '2027',
    you: 4000,
    sp500: 6579.99,
    inflation: 4917.021305,
  },
  {
    name: '2028',
    you: 4000,
    sp500: 7237.99,
    inflation: 5089.117051,
  },
  {
    name: '2029',
    you: 4000,
    sp500: 7961.78,
    inflation: 5267.236148,
  },
  {
    name: '2030',
    you: 4000,
    sp500: 8757.95,
    inflation: 5451.589413,
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
          <Line type="monotone" dataKey="inflation" stroke="#ee364c" />
        </LineChart>
     
    );
}
