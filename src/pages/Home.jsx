import React, { useState, useEffect } from "react";
import { getCoins, getChartData } from "../services/api";
import useFetch from "../hooks/useFetch";
import CoinCard from "../components/CoinCard";
import Chart from "../components/Chart";

const Home = () => {
  const { data: coins, loading, error } = useFetch(getCoins);

  const [chartData, setChartData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 📊 Chart Data
  useEffect(() => {
    if (coins.length > 0) {
      getChartData(coins[0].id).then(setChartData);
    }
  }, [coins]);

  // ⚡ Debounce Logic (FAANG level)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔍 Filtered Coins
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-white text-2xl mb-6">Dashboard</h2>

      {/* 📊 Chart */}
      <Chart data={chartData} />

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search coin..."
        className="p-2 mb-6 w-full rounded bg-gray-800 text-white outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🪙 Coins Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCoins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default Home;