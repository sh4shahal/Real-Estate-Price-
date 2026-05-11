import { createContext, useContext, useState, useCallback } from "react";

const PredictionContext = createContext(null);

const BASE_PRICE_DATA = [
  { month: "Jan", price: 285000 },
  { month: "Feb", price: 295000 },
  { month: "Mar", price: 310000 },
  { month: "Apr", price: 305000 },
  { month: "May", price: 325000 },
  { month: "Jun", price: 340000 },
];

const BASE_REGION_DATA = [
  { region: "Downtown", avg: 450000 },
  { region: "Suburbs", avg: 320000 },
  { region: "Outskirts", avg: 250000 },
  { region: "Waterfront", avg: 580000 },
];

const LOCATION_TO_REGION = {
  downtown: "Downtown",
  Suburbs: "Suburbs",
  Urban: "Outskirts",
  Rural: "Outskirts",
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function PredictionProvider({ children }) {
  const [predictions, setPredictions] = useState([]);
  const [priceData, setPriceData] = useState(BASE_PRICE_DATA);
  const [regionData, setRegionData] = useState(BASE_REGION_DATA);
  const [stats, setStats] = useState({
    avgPropertyValue: 325000,
    propertiesAnalyzed: 1247,
    activeUsers: 3421,
    predictionAccuracy: 94.2,
  });

  const addPrediction = useCallback((predictionResult) => {
    const { price, location } = predictionResult;

    setPredictions((prev) => {
      const updated = [...prev, predictionResult];

      const allPrices = updated.map((p) => p.price);
      const avgPrice = Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length);

      setStats({
        avgPropertyValue: avgPrice,
        propertiesAnalyzed: 1247 + updated.length,
        activeUsers: 3421 + Math.floor(updated.length * 2.7),
        predictionAccuracy: Math.min(99.9, 94.2 + updated.length * 0.05).toFixed(1),
      });

      setPriceData((prevPriceData) => {
        const lastMonth = prevPriceData[prevPriceData.length - 1].month;
        const lastMonthIdx = MONTHS.indexOf(lastMonth);
        const nextMonth = MONTHS[(lastMonthIdx + 1) % 12];
        const newEntry = { month: nextMonth, price: Math.round(price * 0.95) };
        return [...prevPriceData.slice(-5), newEntry];
      });

      const regionLabel = LOCATION_TO_REGION[location] || "Outskirts";
      setRegionData((prevRegionData) =>
        prevRegionData.map((r) => {
          if (r.region === regionLabel) {
            const currentCount = updated.filter(
              (p) => LOCATION_TO_REGION[p.location] === regionLabel
            ).length;
            const newAvg = Math.round((r.avg * (currentCount - 1) + price) / currentCount);
            return { ...r, avg: newAvg };
          }
          return r;
        })
      );

      return updated;
    });
  }, []);

  return (
    <PredictionContext.Provider value={{ predictions, priceData, regionData, stats, addPrediction }}>
      {children}
    </PredictionContext.Provider>
  );
}

export function usePrediction() {
  const ctx = useContext(PredictionContext);
  if (!ctx) throw new Error("usePrediction must be used inside PredictionProvider");
  return ctx;
}