import ProgressReader from "@/app/components/ProgressReader";
import SocialShare from "@/app/components/SocialShare";
import { createClient } from "@/app/config/supabaseServerClient";
import { Link } from "@/i18n/routing";

const BlogPage = async ({ params }) => {
  const { slug, locale } = await params;
  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from("posts")
    .select("*, translations(*)")
    .eq("slug", slug)
    .eq("translations.lang", locale)
    .single();

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        ❌ Blog not found
      </div>
    );
  }

  // Estimate reading time (200 words per minute)
  const words = blog.translations[0].content.split(/\s+/).length;
  const readTime = Math.ceil(words / 200);

  return (
    <div>
      <div className="bg-peach h-32 -mt-10 md:mt-0"></div>
      <div className="relative max-w-5xl mx-auto px-6 py-10 transform -translate-y-32">
        <ProgressReader />
        <div>
          {blog.image_url && (
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
              <img
                src={blog.image_url}
                alt="Blog Cover"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-coffee mt-6">
            {blog.translations[0].title}
          </h1>

          {/* Read Time */}
          <p className="mt-2 text-warmbrown text-sm">
            ⏳ Estimated read time: {readTime} min
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4 mt-4">
            {/* Tags */}
            {blog.translations[0].tags && (
              <div className="flex flex-wrap gap-2">
                {blog.translations[0].tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="bg-softblue text-blue-800 text-sm font-medium p-1 rounded-full"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
            <SocialShare title={blog.title} />
          </div>
          {/* Blog Content */}
          <div
            className="mt-6 prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.translations[0].content }}
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
      </div>
    </div>
  );
};

export default BlogPage;
