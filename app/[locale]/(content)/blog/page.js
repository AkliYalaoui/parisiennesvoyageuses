import { createClient } from "@/app/config/supabaseServerClient";
import { Link } from "@/i18n/routing";
import { FaSearch } from "react-icons/fa";

const Blogs = async ({ searchParams }) => {
  const query = (await searchParams).query;

  const supabase = await createClient();
  // Get query parameters for search, sort, and pagination
  const searchQuery = query?.search || "";
  const sortOrder = query?.sort || "desc";
  const currentPage = parseInt(query?.page || "1", 10);
  const postsPerPage = 6;

  const from = (currentPage - 1) * postsPerPage;
  const to = from + postsPerPage - 1;

  // Fetch blogs from Supabase
  let blogQuery = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: sortOrder === "asc" })
    .range(from, to);

  if (searchQuery) {
    blogQuery = blogQuery.ilike("title", `%${searchQuery}%`);
  }

  const { data: blogs, count, error } = await blogQuery;

  const totalPages = Math.ceil(count / postsPerPage);
  if (error) {
    console.error("Error fetching blogs:", error);
    return { props: { blogs: [], count: 0, currentPage, totalPages: 1 } };
  }

  return (
    <section className="max-w-7xl mx-auto px-6">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">
        Explore the World with Us!
      </h1>
      <p className="text-center text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
        Welcome to our travel blog! We're excited to share our adventures, tips,
        and stories from around the globe. Here, you'll find more than just
        photos—we're bringing you the real experiences, hidden gems, and
        everything that inspires us along the way. Let's discover the world
        together!
      </p>

      {/* Search and Sort Controls */}
      <form
        method="get"
        action="/blog"
        className="flex flex-col md:flex-row justify-between items-center bg-amber-100 p-4 rounded-lg shadow mb-8"
      >
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search blogs..."
            className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <span className="absolute left-4 top-4 text-gray-500">
            <FaSearch size={18} />
          </span>
        </div>

        {/* Sorting Options */}
        <div className="flex items-center space-x-6 mb-4 md:mb-0">
          <div className="flex items-center">
            <input
              type="radio"
              name="sort"
              value="desc"
              id="desc"
              defaultChecked={sortOrder === "desc"}
              className="hidden"
            />
            <label
              htmlFor="desc"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span
                className={`w-4 h-4 rounded-full border-2 ${
                  sortOrder === "desc" ? "bg-amber-900" : "border-gray-400"
                }`}
              ></span>
              <span className="text-gray-700">Newest First</span>
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              name="sort"
              value="asc"
              id="asc"
              defaultChecked={sortOrder === "asc"}
              className="hidden"
            />
            <label
              htmlFor="asc"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span
                className={`w-4 h-4 rounded-full border-2 ${
                  sortOrder === "asc" ? "bg-amber-900" : "border-gray-400"
                }`}
              ></span>
              <span className="text-gray-700">Oldest First</span>
            </label>
          </div>
        </div>
      </form>

      {/* Blogs Grid */}
      {blogs.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              href={`/blog/${blog.id}`}
              key={blog.id}
              className="group block rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
            >
              {blog.image_url && (
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-amber-900 truncate">
                  {blog.title}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-700 line-clamp-3">
                  {blog.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150)}...
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
