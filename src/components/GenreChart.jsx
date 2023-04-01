import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, Sector, Cell, ResponsiveContainer } from "recharts";

const GenreChart = ({ genres }) => {
  console.log(genres);

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];

  return (
    <div>
      {genres ? (
        <PieChart width={400} height={400}>
          <Pie 
          dataKey="count" 
          isAnimationActive={false}
          data={genres} 
          fill="#8884d8" 
          label />
          <Tooltip />
        </PieChart>
      ) : null}
    </div>
  );
};

export default GenreChart;
