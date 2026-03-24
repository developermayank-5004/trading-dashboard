import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h3 className="text-white mb-3">📊 Price Chart</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />

          <XAxis dataKey="date" stroke="#aaa" />

          <YAxis stroke="#aaa" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
