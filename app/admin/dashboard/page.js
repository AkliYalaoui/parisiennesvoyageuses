"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/config/supabaseBrowserClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const supabase = createClient();

  // State
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    totalRevenue: 0,
    salesPerGuide: [],
    salesPerCountry: [],
    salesTrend: [],
    topGuide: null,
    latestPurchases: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);

    // Fetch purchases data
    const { data: purchases, error: purchasesError } = await supabase
      .from("purchases")
      .select("session_id, user_email,user_country, price_paid_in_cents, guide, created_at");

    if (purchasesError) {
      console.error(purchasesError);
      setLoading(false);
      return;
    }

    // Calculate metrics
    const totalSales = purchases.length;
    const totalRevenue =
      purchases.reduce((sum, p) => sum + p.price_paid_in_cents, 0) / 100;

    // Sales per guide
    const guideSales = {};
    purchases.forEach((p) => {
      guideSales[p.guide] = (guideSales[p.guide] || 0) + 1;
    });
    const salesPerGuide = Object.entries(guideSales).map(([guide, count]) => ({
      guide,
      count,
    }));

    // Sales per country
    const countrySales = {};
    purchases.forEach((p) => {
      countrySales[p.user_country] = (countrySales[p.user_country] || 0) + 1;
    });
    const salesPerCountry = Object.entries(countrySales).map(([country, count]) => ({
      country,
      count,
    }));

    // Find top-selling guide
    const topGuide = salesPerGuide.reduce(
      (max, g) => (g.count > (max?.count || 0) ? g : max),
      null
    );

    // Sales trend over time
    const salesTrend = {};
    purchases.forEach((p) => {
      const date = new Date(p.created_at).toLocaleString().split(",")[0]; // Format: YYYY-MM-DD
      salesTrend[date] = (salesTrend[date] || 0) + 1;
    });
    const salesTrendData = Object.entries(salesTrend).map(([date, count]) => ({
      date,
      count,
    }));

    // Latest purchases
    const latestPurchases = purchases
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);

    setMetrics({
      totalSales,
      totalRevenue,
      salesPerGuide,
      salesPerCountry,
      salesTrend: salesTrendData,
      topGuide,
      latestPurchases,
    });

    setLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {loading ? (
        <div className="text-center text-gray-500">Loading data...</div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-500 text-white p-4 rounded-lg text-center shadow-md">
              <p className="text-xl font-bold">{metrics.totalSales}</p>
              <p>Total Sales</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg text-center shadow-md">
              <p className="text-xl font-bold">
                €{metrics.totalRevenue.toFixed(2)}
              </p>
              <p>Total Revenue</p>
            </div>
            {metrics.topGuide && (
              <div className="bg-yellow-500 text-white p-4 rounded-lg text-center shadow-md">
                <p className="text-xl font-bold">{metrics.topGuide.guide}</p>
                <p>Top Selling Guide</p>
              </div>
            )}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Sales Per Guide */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Sales Per Guide</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics.salesPerGuide}>
                  <XAxis dataKey="guide" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sales Per Guide */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Sales Per Country</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics.salesPerCountry}>
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

           {/* Sales Trend Over Time */}
           <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Sales Trend Over Time
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics.salesTrend}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#4CAF50" />
                  <CartesianGrid strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>

          {/* Latest Purchases */}
          <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Latest Purchases</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Guide</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.latestPurchases.map((p) => (
                    <tr key={p.session_id} className="border-b">
                      <td className="p-3">{p.user_email}</td>
                      <td className="p-3">{p.guide}</td>
                      <td className="p-3">
                        €{(p.price_paid_in_cents / 100).toFixed(2)}
                      </td>
                      <td className="p-3">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
