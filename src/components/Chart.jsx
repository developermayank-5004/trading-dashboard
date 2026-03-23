import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-white mb-4">Price Chart</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#00ffcc" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;