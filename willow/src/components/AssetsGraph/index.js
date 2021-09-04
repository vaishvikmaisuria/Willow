import React, { useCallback, useState, useRef, useEffect } from "react";
import { PieChart, Pie, Sector } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`$ ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const useCompare = (val) => {
  // console.log(`val=${val}`);
  const prevVal = usePrevious(val);
  // console.log(`prevVal=${prevVal}`);
  return prevVal !== val;
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const AssetsGraph = ({ assetData }) => {
  const [finalData, setFinalData] = useState([{ name: "Other", value: 1 }]);
  const hasAssetDataChanged = useCompare(assetData);

  useEffect(() => {
    if (hasAssetDataChanged && assetData.name_per_asset) {
      setFinalData([]);
      let data = [];
      for (var i = 0; i < assetData.name_per_asset.length; i++) {
        data.push({
          name: assetData.name_per_asset[i],
          value: assetData.value_per_asset[i],
        });
      }
      setFinalData(data);
    }
  }, [
    hasAssetDataChanged,
    assetData.name_per_asset,
    assetData.value_per_asset,
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={650} height={550}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={finalData}
        cx={325}
        cy={250}
        innerRadius={120}
        outerRadius={180}
        fill="#8884d8"
        dataKey="value"
        ß
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
};

export default AssetsGraph;
