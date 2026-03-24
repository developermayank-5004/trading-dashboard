import React, { useState, useEffect } from "react";
import { getCoins, getChartData } from "../services/api";
import useFetch from "../hooks/useFetch";
import CoinCard from "../components/CoinCard";
import Chart from "../components/Chart";
import { motion } from "framer-motion";

const Home = () => {
  const { data: coins = [], loading, error } = useFetch(getCoins);

  const [chartData, setChartData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [intervalTime, setIntervalTime] = useState(5000);

  // 📊 FETCH CHART
  const fetchChart = async () => {
    const data = await getChartData(selectedCoin);
    setChartData(data);
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    if (coins.length > 0) {
      fetchChart();
    }
  }, [coins, selectedCoin]);

  // 🚀 LIVE UPDATE
  useEffect(() => {
    const interval = setInterval(() => {
      fetchChart();
    }, intervalTime);

    return () => clearInterval(interval);
  }, [selectedCoin, intervalTime]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      <h2 className="text-white text-3xl font-bold mb-6">
        🚀 Trading Dashboard
      </h2>

      {/* 🔥 CONTROL PANEL */}
      <div className="mb-6 backdrop-blur-lg bg-white/10 border border-white/20 p-4 rounded-2xl shadow-lg flex items-center gap-4">
        <label className="text-white">Update Speed:</label>

        <select
          value={intervalTime}
          onChange={(e) => setIntervalTime(Number(e.target.value))}
          className="bg-black/40 text-white p-2 rounded-lg outline-none"
        >
          <option value={2000}>⚡ Fast</option>
          <option value={5000}>⏱ Normal</option>
          <option value={10000}>🐢 Slow</option>
        </select>
      </div>

      {/* 📊 CHART */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-5 rounded-2xl shadow-lg mb-6">
        <Chart data={chartData} />
      </div>

      {/* 🪙 COINS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {coins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => setSelectedCoin(coin.id)}
            className={`cursor-pointer transition ${
              selectedCoin === coin.id
                ? "scale-105 border border-green-400 rounded-xl"
                : ""
            }`}
          >
            <CoinCard coin={coin} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;