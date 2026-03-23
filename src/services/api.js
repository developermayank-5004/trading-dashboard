import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

// ✅ THIS MUST BE PRESENT
export const getCoins = async () => {
  const res = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
    },
  });
  return res.data;
};

// ✅ Chart function bhi hona chahiye
export const getChartData = async (coinId) => {
  const res = await axios.get(
    `${BASE_URL}/coins/${coinId}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days: 7,
      },
    }
  );

  return res.data.prices.map((item) => ({
    time: new Date(item[0]).toLocaleDateString(),
    price: item[1],
  }));
};