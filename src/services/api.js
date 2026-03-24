import axios from "axios";

// 🔥 VITE PROXY BASE
const BASE_URL = "/api";

// 🪙 GET COINS
export const getCoins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 20,
        page: 1,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    return [];
  }
};

// 📊 GET CHART DATA
export const getChartData = async (coinId, days = 7) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days,
        },
      }
    );

    return res.data.prices.map((item) => ({
      date: new Date(item[0]).toLocaleDateString(),
      price: item[1],
    }));
  } catch (error) {
    console.error("Error fetching chart:", error);
    return [];
  }
};