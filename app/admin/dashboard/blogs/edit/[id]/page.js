"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/config/supabaseBrowserClient";
import { FaSave, FaTimes } from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import Editor from "@/app/components/Editor";
import { translateText } from "@/app/lib/translateblogs";
import slugify from "slugify";

const EditBlog = () => {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch the blog post data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*, translations(*)")
        .eq("translations.lang", "en")
        .eq("id", blogId)
        .single();

      setLoading(false);

      if (error) {
        setError("Failed to fetch blog details.");
        return;
      }

      setTitle(data.translations[0].title);
      setContent(data.translations[0].content);
      setImageUrl(data.image_url);
      setTags(data.translations[0].tags || "");
    };

    fetchBlog();
  }, [blogId, supabase]);

  // Handle image upload to Supabase
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("posts_cover")
      .upload(fileName, file);

    if (error) {
      setError("Image upload failed. Please try again.");
      setLoading(false);
      return;
    }

    const url = supabase.storage.from("posts_cover").getPublicUrl(fileName)
      .data?.publicUrl;
    setImageUrl(url);
    setLoading(false);
  };

  // Handle blog update submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !content) {
      setError("Please fill in both the title and content.");
      return;
    }

    setLoading(true);

    const slug = slugify(title, { lower: true, strict: true }); // update slug

    const { error } = await supabase
      .from("posts")
      .update({
        image_url: imageUrl,
        slug,
      })
      .eq("id", blogId);

    if (error) {
      setError("Error updating blog. Please try again.");
      return;
    }

    // Update the translations for all languages
    const languages = [
      { code: "en", name: "English" },
      { code: "fr", name: "French" },
      { code: "ko", name: "Korean" },
      { code: "ja", name: "Japanese" }
    ];

    let translationUpdates = [
      {
        blog_id: blogId,
        title,
        content,
        tags,
        lang: "en", // English as the base language
      },
    ];

    // Generate the translations for each language
    for (const lang of languages.filter((l) => l.code !== "en")) {
      const translatedTitle = await translateText(title, lang.name);
      const translatedContent = await translateText(content, lang.name);
      const translatedTags = tags ? await translateText(tags, lang.name) : "";

      translationUpdates.push({
        blog_id: blogId,
        title: translatedTitle,
        content: translatedContent,
        tags: translatedTags,
        lang: lang.code,
      });
    }

    // Update the translations in Supabase
    const { error: translationsError } = await supabase
      .from("translations")
      .upsert(translationUpdates, { onConflict: ["blog_id", "lang"] });

    setLoading(false);

    if (translationsError) {
      console.log(translationsError);
    
      setError("Error updating  translations. Please try again.");
      return;
    }

    router.push("/admin/dashboard/blogs");
  };

  // Generate HTML for the preview
  const generatePreviewHTML = () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          padding: 20px;
          color: #333;
        }
        h1 {
          color: #1d4ed8;
        }
        p, ul, blockquote {
          margin: 10px 0;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
        blockquote {
          font-style: italic;
          margin: 20px 0;
          padding: 10px 20px;
          border-left: 5px solid #3b82f6;
          background: #eef2ff;
        }
        ul {
          padding-left: 20px;
          list-style-type: disc;
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      ${imageUrl ? `<img src="${imageUrl}" alt="Blog cover">` : ""}
      ${content}
      <p><strong>Tags:</strong> ${tags}</p>
    </body>
    </html>
  `;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-gray-100 to-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Edit Blog</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Cover Image
            </label>
            <div className="flex items-center mt-2">
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="flex-grow"
              />
              {loading && (
                <span className="ml-4 text-gray-500 animate-pulse">
                  Uploading...
                </span>
              )}
            </div>
            {imageUrl && (
              <div className="mt-4">
                <img src={imageUrl} alt="Blog cover" className="rounded-md" />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-gray-700 font-semibold"
            >
              Content *
            </label>
            <Editor value={content} onChange={setContent} />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-gray-700 font-semibold">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comma-separated tags (e.g., Tech, Programming)"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              <FaSave className="mr-2" />
              {loading ? "Saving..." : "Update Blog"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard/blogs")}
              className="flex items-center text-red-600 px-4 py-2 rounded-md hover:text-red-700"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Preview */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Preview</h2>
        <iframe
          srcDoc={generatePreviewHTML()}
          className="w-full h-96 border rounded-md"
          title="Blog Preview"
        ></iframe>
      </div>
    </div>
  );
};

export default EditBlog;
