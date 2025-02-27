"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/config/supabaseBrowserClient";

export default function AdminPurchasesPage() {
  const supabase = createClient();

  // State management
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterGuide, setFilterGuide] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10; // Items per page

  useEffect(() => {
    fetchPurchases();
  }, [sortBy, sortOrder, filterGuide, page]);

  const sort_to_column = {
    "first_name" : "user_first_name",
    "last_name" : "user_last_name",
    "email" : "user_email",
    "guide" : "guide",
    "amount" : "price_paid_in_cents",
    "date" : "created_at",
  }
  async function fetchPurchases() {
    setLoading(true);
    let query = supabase.from("purchases").select("*", { count: "exact" });

    // Filtering by email
    if (filterGuide) {
      query = query.ilike("guide", `%${filterGuide}%`);
    }

    // Sorting
    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) console.error(error);
    setPurchases(data || []);
    setTotalPages(Math.ceil(count / limit));
    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Purchases History</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by guide..."
          value={filterGuide}
          onChange={(e) => setFilterGuide(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={() => setPage(1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              {["Email", "First Name", "Last Name","Guide", "Amount", "Date"].map((col) => {
                const key = sort_to_column[col.toLowerCase().replace(" ", "_")];
                return (
                  <th
                    key={key}
                    className="p-3 cursor-pointer"
                    onClick={() => {
                      setSortBy(key);
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    {col} {sortBy === key ? (sortOrder === "asc" ? "🔼" : "🔽") : ""}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-3 text-center">
                  Loading...
                </td>
              </tr>
            ) : purchases.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No purchases found
                </td>
              </tr>
            ) : (
              purchases.map((p) => (
                <tr key={p.session_id} className="border-b">
                  <td className="p-3">{p.user_email}</td>
                  <td className="p-3">{p.user_first_name}</td>
                  <td className="p-3">{p.user_last_name}</td>
                  <td className="p-3">{p.guide}</td>
                  <td className="p-3">€{(p.price_paid_in_cents / 100).toFixed(2)}</td>
                  <td className="p-3">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
