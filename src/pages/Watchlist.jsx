import React, { useEffect, useState } from "react";
import CoinCard from "../components/CoinCard";

const Watchlist = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setCoins(saved);
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-white text-2xl mb-4">⭐ Watchlist</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {coins.length > 0 ? (
          coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))
        ) : (
          <p className="text-white">No coins added</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;