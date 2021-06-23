import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: '2021',
    uv: 4000,
    pv: 2400,
  },
  {
    name: '2022',
    uv: 3000,
    pv: 1398,
  },
  {
    name: '2023',
    uv: 2000,
    pv: 9800,
  },
  {
    name: '2024',
    uv: 2780,
    pv: 3908,

  },
  {
    name: '2025',
    uv: 1890,
    pv: 4800,

  },
  {
    name: '2026',
    uv: 2390,
    pv: 3800,

  },
  {
    name: '2027',
    uv: 3490,
    pv: 4300,
 
  },
  {
    name: '2028',
    uv: 3490,
    pv: 4300,
 
  },
  {
    name: '2029',
    uv: 3490,
    pv: 4300,
 
  },
  {
    name: '2030',
    uv: 3490,
    pv: 4300,
 
  }
];

export default function StockGraph () {

    return (
     
        <LineChart
          width={700}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
     
    );
}
