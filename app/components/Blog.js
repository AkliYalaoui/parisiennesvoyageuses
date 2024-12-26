import React from "react";
import Image from "next/image";
import Link from "next/link";

const Blog = () => {
  return (
    <section className="bg-orange-950 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <Image
              src="/b.jpg"
              alt="Travel Blog"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              height="500"
              width="500"
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange-100 mb-4">
              Learn from Our Journey
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Join us on a captivating adventure across the globe. Discover our
              travel tips, stories, and unique experiences from exploring
              different countries.
            </p>
            <Link
              href="/content/blog"
              className="px-5 py-3 bg-orange-400 text-orange-950 font-bold text-lg rounded-lg shadow-lg hover:bg-orange-900 transition-all duration-300"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
