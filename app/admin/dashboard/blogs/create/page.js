"use client";

import { useState } from "react";
import { createClient } from "@/app/config/supabaseBrowserClient";
import { FaSave, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { translateText } from "@/app/lib/translateblogs";
import slugify from "slugify";

// Dynamically import the Editor component with SSR disabled
const Editor = dynamic(() => import("@/app/components/Editor"), { ssr: false });

const CreateBlog = () => {
  const supabase = createClient();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { _, error } = await supabase.storage
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content) {
      setError("Please fill in both the title and content.");
      return;
    }

    setLoading(true);

    const slug = slugify(title, { lower: true, strict: true }); // Generate slug
    // Insert the base post into `posts` table
    const { data: post, error: postError } = await supabase
      .from("posts")
      .insert([{ slug, image_url: imageUrl }])
      .select("id")
      .single();

    if (postError) {
      setError("Error creating blog. Please try again.");
      setLoading(false);
      return;
    }

    const postId = post.id; // Get the newly created post ID

    // Generate the main post (English)
    let blogEntries = [
      {
        blog_id: postId,
        title,
        content,
        tags,
        lang: "en", // English as the base language
      },
    ];

    const languages = [
      { code: "en", name: "English" }, // 🇬🇧 English
      { code: "fr", name: "French" }, // 🇫🇷 Français
      { code: "ko", name: "Korean" }, // 🇰🇷 한국어
      { code: "ja", name: "Japanese" }, // 🇯🇵 日本語
    ];

    // Translate and create separate entries for each language
    for (const lang of languages.filter((l) => l.code !== "en")) {
      const translatedTitle = await translateText(title, lang.name);
      const translatedContent = await translateText(content, lang.name);
      const translatedTags = tags ? await translateText(tags, lang.name) : "";

      blogEntries.push({
        blog_id: postId,
        title: translatedTitle,
        content: translatedContent,
        tags: translatedTags,
        lang: lang.code,
      });
    }

    // Insert all translations into Supabase
    const { error: translationError } = await supabase
      .from("translations")
      .insert(blogEntries);

    setLoading(false);

    if (translationError) {
      setError("Error saving translations. Please try again.");
      return;
    }

    router.push("/admin/dashboard/blogs");
  };

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
    ${
      !(title || imageUrl || content || tags)
        ? "<p>Your preview will show here</p>"
        : ""
    }
      <h1>${title}</h1>
      ${imageUrl ? `<img src="${imageUrl}" alt="Blog cover">` : ""}
      ${content}
      ${tags ? "<p><strong>Tags:</strong>" + tags + "</p>" : ""}
    </body>
    </html>
  `;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-gray-100 to-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Create a New Blog
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold">
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
            {loading ? "Saving..." : "Publish Blog"}
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

export default CreateBlog;
