"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/config/supabaseBrowserClient";
import Link from "next/link";
import { FaTrashAlt, FaPlusCircle, FaPenAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const BlogsPage = () => {
  const supabase = createClient();

  // State variables
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("created_at");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null); // Track ID of deleting blog
  const [error, setError] = useState("");

  const pageSize = 10; // Number of blogs per page

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error, count } = await supabase
        .from("posts")
        .select("*, translations(*)", { count: "exact" })
        .eq("translations.lang", "en")
        .ilike("translations.title", `%${searchTerm}%`)
        .order(sortBy, { ascending: true })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

      if (error) throw error;

      setBlogs(data.filter(blog => blog.translations.length > 0));
      setTotalPages(Math.ceil(count / pageSize));
    } catch (error) {
      setError("Failed to fetch blogs. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, currentPage, sortBy]);

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    setDeleting(id);
    setError("");

    try {
      const imgUrl = blogs.find((b) => b.id == id)?.image_url;

      if (imgUrl) {
        const imagePath = imgUrl.split("/").pop();
        const { dataDelete, error: deleteImageError } = await supabase.storage
          .from("posts_cover")
          .remove([imagePath]);
        console.log(dataDelete);

        if (deleteImageError) {
          console.error("Error deleting cover photo:", deleteImageError);
        }
      }

      const { error: deleteBlogError } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (deleteBlogError) throw deleteBlogError;

      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      setError("Failed to delete the blog. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search Bar and Create Button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
          <button
            onClick={() =>
              setSortBy(sortBy === "created_at" ? "title" : "created_at")
            }
            className="p-2 rounded-md bg-green-700 text-white hover:bg-green-800"
          >
            Sort by {sortBy === "created_at" ? "Title" : "Date"}
          </button>
          <Link
            href="/admin/dashboard/blogs/create"
            className="flex items-center p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FaPlusCircle size={16} className="mr-2" /> New Blog
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="mb-4 text-red-600">{error}</p>}

      {/* Blogs List */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left text-gray-700 uppercase text-sm">
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Skeleton Loader
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="border px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </td>
                  <td className="border px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </td>
                  <td className="border px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </td>
                </tr>
              ))
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-6">
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <tr
                  key={blog.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border px-6 py-4 text-ellipsis">{blog.translations[0].title}</td>
                  <td className="border px-6 py-4 text-ellipsis">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>
                  <td className="border px-6 py-4">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        disabled={deleting === blog.id}
                      >
                        {deleting === blog.id ? (
                          <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                          <FaTrashAlt />
                        )}
                      </button>
                      <Link
                        href={`/admin/dashboard/blogs/edit/${blog.id}`}
                        className="p-2 bg-green-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <FaPenAlt />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded-md bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-md bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogsPage;
