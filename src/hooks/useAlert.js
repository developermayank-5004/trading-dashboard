import { useEffect } from "react";

const useAlert = (coins) => {
  useEffect(() => {
    const alerts = JSON.parse(localStorage.getItem("alerts")) || [];

    alerts.forEach((alert) => {
      const coin = coins.find((c) => c.id === alert.id);

      if (!coin) return;

      if (alert.type === "above" && coin.current_price > alert.price) {
        alertUser(coin.name, coin.current_price);
      }

      if (alert.type === "below" && coin.current_price < alert.price) {
        alertUser(coin.name, coin.current_price);
      }
    });
  }, [coins]);
};

const alertUser = (name, price) => {
  alert(`🚨 ${name} reached $${price}`);
};

export default useAlert;