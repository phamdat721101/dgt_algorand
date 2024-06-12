import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

interface IPieChartProp {
  data?: any;
  colors?: string;
}

const dataDemo = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 200 },
  { name: "Group F", value: 200 },
];
const COLORS = [
  "#F87171",
  "#60A5FA",
  "#818CF8",
  "#FBBF24",
  "#F472B6",
  "#3B82F6",
];

const PieChartCustom = (props: IPieChartProp) => {
  const { data = dataDemo, colors = COLORS } = props;
  return (
    <PieChart width={220} height={220}>
      <Pie
        data={data}
        cx={110}
        cy={110}
        innerRadius={80}
        outerRadius={105}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry: any, index: any) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartCustom;
