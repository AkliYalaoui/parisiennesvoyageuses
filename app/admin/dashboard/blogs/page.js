"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/config/supabaseBrowserClient";
import Link from "next/link";
import { FaTrashAlt, FaPlusCircle, FaPenAlt } from "react-icons/fa";

const BlogsPage = () => {
  const supabase = createClient();

  // State variables
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("created_at"); // Default sorting by created date

  // Pagination and Sorting
  const pageSize = 10; // Number of blogs per page

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error, count } = await supabase
        .from("posts")
        .select("*", { count: "exact" })
        .ilike("title", `%${searchTerm}%`) // Search term filter
        .order(sortBy, { ascending: true }) // Sorting
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

      if (error) {
        console.error(error.message);
      } else {
        setBlogs(data);
        setTotalPages(Math.ceil(count / pageSize)); // Calculate total pages
      }
    };

    fetchBlogs();
  }, [searchTerm, currentPage, sortBy]);

  // Handle blog deletion
  const deleteBlog = async (id) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) {
        console.error("Error deleting blog:", error);
      } else {
        // Refresh the blog list after deletion
        setBlogs(blogs.filter(blog => blog.id !== id));
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="py-8">
      {/* Search Bar */}
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search blogs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <div className="flex items-center">
          <button
            onClick={() => setSortBy(sortBy === "created_at" ? "title" : "created_at")}
            className="ml-4 p-2 rounded bg-amber-950 text-white"
          >
            Sort by {sortBy === "created_at" ? "Title" : "Date"}
          </button>
          <Link
            href="/admin/dashboard/blogs/create"
            className="ml-4 p-2 rounded bg-orange-900 text-white flex items-center"
          >
            <FaPlusCircle size={16} className="mr-2" /> Create New Blog
          </Link>
        </div>
      </div>

      {/* Blogs List */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td className="border px-4 py-2">{blog.title}</td>
              <td className="border px-4 py-2">{new Date(blog.created_at).toLocaleDateString()}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
                <Link href={`/admin/dashboard/blogs/edit/${blog.id}`} className="text-blue-500 hover:text-blue-700">
                  <FaPenAlt/>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border rounded bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogsPage;
