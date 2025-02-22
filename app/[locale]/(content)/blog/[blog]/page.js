import ProgressReader from "@/app/components/ProgressReader";
import SocialShare from "@/app/components/SocialShare";
import { createClient } from "@/app/config/supabaseServerClient";
import { Link } from "@/i18n/routing";

const BlogPage = async ({ params }) => {
  const blogId = (await params).blog;
  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", blogId)
    .single();

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        ❌ Blog not found
      </div>
    );
  }

  // Estimate reading time (200 words per minute)
  const words = blog.content.split(/\s+/).length;
  const readTime = Math.ceil(words / 200);

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
      <ProgressReader />
      {/* Blog Content Section */}
      <div className="lg:w-3/4">
        {blog.image_url && (
          <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
            <img
              src={blog.image_url}
              alt="Blog Cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6">
          {blog.title}
        </h1>

        {/* Read Time */}
        <p className="mt-2 text-gray-500 text-sm">
          ⏳ Estimated read time: {readTime} min
        </p>

        {/* Tags */}
        {blog.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {blog.tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Blog Content */}
        <div
          className="mt-6 prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Back Button */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>

      <div className="lg:w-1/4 flex flex-col items-center space-y-6 sticky top-20">
        <SocialShare title={blog.title} />
      </div>
    </div>
  );
};

export default BlogPage;
