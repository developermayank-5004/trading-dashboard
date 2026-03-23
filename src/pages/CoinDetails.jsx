import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChartData } from "../services/api";
import Chart from "../components/Chart";

const CoinDetails = () => {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getChartData(id).then(setChartData);
  }, [id]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl mb-6 uppercase">{id}</h2>

      <Chart data={chartData} />
    </div>
  );
};

export default CoinDetails;