import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CoinCard = ({ coin }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  if (!coin) return null;

  // 🔥 check watchlist
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    const exists = saved.find((item) => item.id === coin.id);
    setIsSaved(!!exists);
  }, [coin.id]);

  // ⭐ Add
  const handleAdd = (e) => {
    e.stopPropagation();

    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!saved.find((item) => item.id === coin.id)) {
      saved.push(coin);
      localStorage.setItem("watchlist", JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  // ❌ Remove
  const handleRemove = (e) => {
    e.stopPropagation();

    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    const updated = saved.filter((item) => item.id !== coin.id);

    localStorage.setItem("watchlist", JSON.stringify(updated));
    setIsSaved(false);
  };

  return (
    <motion.div
      onClick={() => navigate(`/coin/${coin.id}`)}

      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}

      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}

      className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl text-white shadow-lg cursor-pointer hover:shadow-2xl transition"
    >
      {/* IMAGE */}
      <motion.img
        src={coin?.image}
        alt={coin?.name}
        className="w-12 mb-3"
        whileHover={{ rotate: 5, scale: 1.1 }}
      />

      {/* NAME */}
      <h3 className="text-lg font-semibold mb-1">
        {coin?.name || "N/A"}
      </h3>

      {/* PRICE */}
      <p className="text-sm text-gray-300">
        Price: $
        {coin?.current_price
          ? coin.current_price.toFixed(2)
          : "Loading..."}
      </p>

      {/* CHANGE */}
      <p
        className={`text-sm font-medium ${
          coin?.price_change_percentage_24h > 0
            ? "text-green-400 drop-shadow-[0_0_6px_#4ade80]"
            : "text-red-400 drop-shadow-[0_0_6px_red]"
        }`}
      >
        {coin?.price_change_percentage_24h
          ? coin.price_change_percentage_24h.toFixed(2)
          : "0.00"}
        %
      </p>

      {/* BUTTON */}
      {isSaved ? (
        <motion.button
          onClick={handleRemove}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="mt-3 w-full bg-red-500 hover:bg-red-600 py-1 rounded-lg transition"
        >
          ❌ Remove
        </motion.button>
      ) : (
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-1 rounded-lg transition"
        >
          ⭐ Add
        </motion.button>
      )}
    </motion.div>
  );
};

export default CoinCard;