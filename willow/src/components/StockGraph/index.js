import React, { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "2017",
    you: 0,
    sp500: 2278.87,
    inflation: 0,
  },
  {
    name: "2018",
    you: 0,
    sp500: 2673.81,
    inflation: 0,
  },
  {
    name: "2019",
    you: 0,
    sp500: 2704.1,
    inflation: 0,
  },
  {
    name: "2020",
    you: 0,
    sp500: 3225.52,
    inflation: 0,
  },
];

const useCompare = (val) => {
  const prevVal = usePrevious(val);
  return prevVal !== val;
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function StockGraph({ stockData }) {
  const [finalData, setFinalData] = useState(data);
  const hasAssetDataChanged = useCompare(stockData);

  const calculateTotal = (data) => {
    let name_per_stock = data.stock_names;
    let price_per_stock = data.price_per_stock;
    let quantity_per_stock = data.quantity_per_stock;
    let total = 0;
    for (var i = 0; i < name_per_stock.length; i++) {
      total = total + price_per_stock[i] * quantity_per_stock[i];
    }
    return total;
  };

  const calculateData = (data, total) => {
    let tempData = [
      {
        name: "2021",
        you: total,
        sp500: total,
        inflation: total,
      },
    ];
    let tempSP500 = total;
    let tempInflation = total;
    for (var i = 22; i < 31; i++) {
      tempSP500 = tempSP500 * 1.1;
      tempInflation = tempInflation * 1.035;
      tempData.push({
        name: "20" + i,
        you: total,
        sp500: tempSP500,
        inflation: tempInflation,
      });
    }
    return tempData;
  };

  useEffect(() => {
    if (hasAssetDataChanged && stockData.stock_names) {
      let total = calculateTotal(stockData);
      let data = calculateData(stockData, total);
      setFinalData(finalData.concat(data));
    }
  }, [
    hasAssetDataChanged,
    finalData,
    setFinalData,
    stockData,
    stockData.stock_names,
  ]);

  return (
    <LineChart
      width={700}
      height={550}
      data={finalData}
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
      <Line
        type="monotone"
        dataKey="sp500"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="you" stroke="#82ca9d" />
      <Line type="monotone" dataKey="inflation" stroke="#ee364c" />
    </LineChart>
  );
}
