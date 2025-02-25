"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/config/supabaseBrowserClient";
import { useSearchParams, useParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/routing";
import { FaSearch } from "react-icons/fa";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

const Blogs = () => {
  const { locale } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchQuery = searchParams.get("search") || "";
  const sortOrder = searchParams.get("sort") || "desc";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const supabase = createClient();
      const from = (currentPage - 1) * postsPerPage;
      const to = from + postsPerPage - 1;

      let blogQuery = supabase
        .from("posts")
        .select("*, translations(*)", { count: "exact" })
        .eq("translations.lang", locale)
        .order("created_at", { ascending: sortOrder === "asc" })
        .range(from, to);

      if (searchQuery) {
        blogQuery = blogQuery.ilike("translations.title", `%${searchQuery}%`);
      }

      const { data, error } = await blogQuery;

      const { count } = await supabase
        .from("posts")
        .select("*", { count: "exact" });

      if (error) {
        setError(error.message);
      } else {
        setBlogs(data.filter((blog) => blog.translations.length > 0));
        setCount(count);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, [searchQuery, sortOrder, currentPage]);

  const totalPages = Math.ceil(count / postsPerPage);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSearch = formData.get("search");
    router.push(`/blog?search=${newSearch}&sort=${sortOrder}&page=1`);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:pt-20">
      <h1
        className={`${pacifico.className} text-4xl sm:text-5xl lg:text-6xl  font-extrabold text-center text-coffee mb-6 tracking-tight`}
      >
        Explore the World with Us!
      </h1>
      <p className="text-center text-xl text-warmbrown mb-12 max-w-4xl mx-auto">
        Welcome to our travel blog! We're excited to share our adventures, tips,
        and stories from around the globe.
      </p>

      {/* Search and Sort Controls */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row justify-between items-center bg-peach p-4 rounded-lg shadow mb-8"
      >
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search blogs..."
            className="w-full p-3 pl-12  rounded-lg focus:outline-none focus:ring-1 focus:ring-warmbrown"
          />
          <span className="absolute left-4 top-4 text-coffee">
            <FaSearch size={18} />
          </span>
        </div>
        {/* Sorting Options */}
        <div className="flex items-center space-x-6 mb-4 md:mb-0">
          <button
            type="button"
            onClick={() =>
              router.push(`/blog?search=${searchQuery}&sort=desc&page=1`)
            }
            className={`px-4 py-2 rounded-lg ${
              sortOrder === "desc"
                ? "bg-coffee text-peach"
                : "bg-gray-200 text-coffee hover:bg-gray-300"
            }`}
          >
            Newest First
          </button>
          <button
            type="button"
            onClick={() =>
              router.push(`/blog?search=${searchQuery}&sort=asc&page=1`)
            }
            className={`px-4 py-2 rounded-lg ${
              sortOrder === "asc"
                ? "bg-coffee text-peach"
                : "bg-gray-200 text-coffee hover:bg-gray-300"
            }`}
          >
            Oldest First
          </button>
        </div>
      </form>

      {/* Blogs Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : blogs.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.id}
              className="group block rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
            >
              {blog.image_url && (
                <img
                  src={blog.image_url}
                  alt={blog.translations[0].title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-coffee group-hover:text-warmbrown truncate">
                  {blog.translations[0].title}
                </h2>
                <p className="text-coffee text-sm mt-2">
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
                <p className="mt-2 text-warmbrown line-clamp-3">
                  {blog.translations[0].content
                    ?.replace(/<\/?[^>]+(>|$)/g, "")
                    ?.slice(0, 150)}
                  ...
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs found.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-12 space-x-4">
        <Link
          href={`/blog?page=${Math.max(
            currentPage - 1,
            1
          )}&search=${searchQuery}&sort=${sortOrder}`}
          className={`px-5 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 ${
            currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Previous
        </Link>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Link
          href={`/blog?page=${Math.min(
            currentPage + 1,
            totalPages
          )}&search=${searchQuery}&sort=${sortOrder}`}
          className={`px-5 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 ${
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </section>
  );
};

export default Blogs;
