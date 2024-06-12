import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useFormatter } from "next-intl";

interface IPieChartProp {
  data?: any;
  colors?: string;
}

const dataDemo = [
  { name: "Group A", value: 400, logo_url: "" },
  { name: "Group B", value: 300, logo_url: "" },
  { name: "Group C", value: 300, logo_url: "" },
  { name: "Group D", value: 200, logo_url: "" },
  { name: "Group E", value: 200, logo_url: "" },
  { name: "Group F", value: 200, logo_url: "" },
];

const COLORS = [
  "#F87171",
  "#60A5FA",
  "#818CF8",
  "#FBBF24",
  "#F472B6",
  "#3B82F6",
];

const renderActiveShape = (props: any) => {
  const format = useFormatter();
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
      {/* <image
        href={payload.logo_url}
        width={30}
        height={30}
        x={cx}
        y={cy - 30}
        // dy={8}
        textAnchor="middle"
        fill={fill}
      /> */}
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        ${format.number(payload.value)}
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
      {/* <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      /> */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        fontSize="14px"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
      >{`${payload.name}`}</text>
      <text
        fontSize="14px"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={fill}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export default function PieChartCustom(props: IPieChartProp) {
  const { data, colors } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data?.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
