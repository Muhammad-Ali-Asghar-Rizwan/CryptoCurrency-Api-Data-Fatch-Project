

"use client"
import axios from "axios";
import { useState, useEffect } from "react";


interface Coin {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}
const CryptoDashboard = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoinRate = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`,
          {
            headers: {
              Authorization: `Bearer 5o6mmqPqSSXkRmWgM2IiuZlaRxfnb1IF`,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinRate();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-red-800">Loading...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-semibold text-center text-black mb-8">
        Cryptocurrency Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="bg-white p-6 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h1 className="text-xl font-bold text-center text-red-600 mb-4 uppercase">
              {coin.name || "Unknown Coin"}
            </h1>

            <div className="mb-4">
              <p className="text-lg text-blue-600">Price (USD):</p>
              <p className="text-xl font-bold text-slate-800">
                ${coin.current_price?.toFixed(2) || "N/A"}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg text-slate-600">Market Cap:</p>
              <p className="text-xl font-bold text-slate-800">
                ${coin.market_cap?.toLocaleString() || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-lg text-blue-600">24h Change:</p>
              <p
                className={`text-xl font-semibold ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h?.toFixed(2) || "0.00"}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoDashboard;
