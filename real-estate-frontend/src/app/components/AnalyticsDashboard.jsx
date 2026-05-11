import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Home, DollarSign, Users } from "lucide-react";
import { usePrediction } from "../../context/PredictionContext";

export function AnalyticsDashboard() {
  const { priceData, regionData, stats, predictions } = usePrediction();

  const metrics = [
    {
      label: "Avg. Property Value",
      value: `₹${Math.round(stats.avgPropertyValue).toLocaleString("en-IN")}`,
      change: "+12.3%",
      icon: TrendingUp,
    },
    {
      label: "Properties Analyzed",
      value: stats.propertiesAnalyzed.toLocaleString(),
      change: `+${predictions.length > 0 ? predictions.length : 0} new`,
      icon: Home,
    },
    {
      label: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: "+23.1%",
      icon: Users,
    },
    {
      label: "Prediction Accuracy",
      value: `${stats.predictionAccuracy}%`,
      change: "+2.1%",
      icon: DollarSign,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* KPI Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="p-6 border rounded-xl bg-white hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-medium text-green-600">{metric.change}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={metric.value}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold mb-1"
              >
                {metric.value}
              </motion.div>
            </AnimatePresence>
            <div className="text-sm text-gray-500">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Latest Prediction Banner */}
      {predictions.length > 0 && (
        <AnimatePresence>
          <motion.div
            key={predictions.length}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between"
          >
            <div className="text-sm text-blue-800 font-medium">
              🏠 Latest prediction:{" "}
              <span className="font-bold">
                ₹{predictions[predictions.length - 1].price.toLocaleString("en-IN")}
              </span>{" "}
              — {predictions[predictions.length - 1].formData?.location || "Unknown location"}
            </div>
            <span className="text-xs text-blue-500">
              {predictions.length} prediction{predictions.length > 1 ? "s" : ""} made
            </span>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 border rounded-xl bg-white"
        >
          <h3 className="text-lg font-semibold mb-6">Price Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Price"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: "#2563eb", r: 4 }}
                isAnimationActive={true}
                animationDuration={600}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 border rounded-xl bg-white"
        >
          <h3 className="text-lg font-semibold mb-6">Regional Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="region" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Avg Price"]}
              />
              <Bar
                dataKey="avg"
                fill="#0e54ea"
                radius={[8, 8, 0, 0]}
                isAnimationActive={true}
                animationDuration={600}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Prediction History Table */}
      {predictions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-6 border rounded-xl bg-white"
        >
          <h3 className="text-lg font-semibold mb-4">Prediction History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-500 text-left">
                  <th className="pb-3 pr-4">#</th>
                  <th className="pb-3 pr-4">Location</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Bedrooms</th>
                  <th className="pb-3 pr-4">Area</th>
                  <th className="pb-3">Predicted Price</th>
                </tr>
              </thead>
              <tbody>
                {[...predictions].reverse().map((p, i) => (
                  <motion.tr
                    key={predictions.length - i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="py-3 pr-4 text-gray-400">{predictions.length - i}</td>
                    <td className="py-3 pr-4 capitalize">{p.location}</td>
                    <td className="py-3 pr-4 capitalize">{p.formData?.propertyType || "—"}</td>
                    <td className="py-3 pr-4">{p.formData?.bedrooms} BHK</td>
                    <td className="py-3 pr-4">{p.formData?.sqft?.[0]} sq ft</td>
                    <td className="py-3 font-semibold text-blue-700">
                      ₹{p.price.toLocaleString("en-IN")}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}