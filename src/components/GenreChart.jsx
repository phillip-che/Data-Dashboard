import { PieChart, Pie, Tooltip, Sector, Cell, ResponsiveContainer } from "recharts";

const GenreChart = ({ genres }) => {
  console.log(genres);

  return (
    <div>
      {genres ? (
        <PieChart width={400} height={400} >
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
