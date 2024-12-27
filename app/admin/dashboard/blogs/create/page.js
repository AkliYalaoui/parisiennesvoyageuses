"use client";

import { useState } from "react";
import { createClient } from "@/app/config/supabaseBrowserClient";
import { FaImage, FaSave, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Editor from "@/app/components/Editor";

// Set up the Create Blog Page
const CreateBlog = () => {
  const supabase = createClient();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle image upload to Supabase
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) {
      console.error("Image upload failed", error);
      setLoading(false);
      return;
    }

    const url = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName).publicURL;
    setImageUrl(url);
    setLoading(false);
  };

  // Handle blog submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content) {
      alert("Please fill in both title and content.");
      return;
    }

    setLoading(true);

    // Insert the new blog post into the Supabase database
    const { error } = await supabase.from("posts").insert([
      {
        title,
        content,
        image_url: imageUrl,
        tags: tags.split(",").map((tag) => tag.trim()),
        created_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error creating blog:", error);
      return;
    }

    // Redirect to the blogs list or dashboard after submission
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
          font-family: Arial, sans-serif;
          line-height: 1.6;
          padding: 20px;
        }
        h1 {
          color: #333;
        }
        p {
          margin: 10px 0;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        blockquote {
          font-style: italic;
          margin: 20px 0;
          padding: 10px 20px;
          border-left: 5px solid #ccc;
          background: #f9f9f9;
        }
        ul {
          padding-left: 20px;
          margin: 10px 0;
        }
        ul li {
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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-amber-950">
        Create a New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Blog Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Blog Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium">
            Upload Cover Image
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="mt-2"
          />
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Blog cover"
                className="max-w-full h-auto"
              />
            </div>
          )}
          {loading && <p className="text-sm text-gray-500">Uploading...</p>}
        </div>

        {/* Blog Content */}
        <div>
          <label htmlFor="content" className="block text-gray-700 font-medium">
            Content *
          </label>
          <Editor value={content} onChange={setContent} />
        </div>

        {/* Tags or Categories */}
        <div>
          <label htmlFor="tags" className="block text-gray-700 font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter tags (e.g., Travel, Adventure)"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-md"
          >
            <FaSave size={16} className="mr-2" />
            {loading ? "Saving..." : "Publish Blog"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/dashboard/blogs")}
            className="flex items-center text-red-600 hover:text-red-700 px-4 py-2 rounded-md"
          >
            <FaTimes size={16} className="mr-2" />
            Cancel
          </button>
        </div>
      </form>
      {/* Blog Preview */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Preview</h2>
        <iframe
          srcDoc={generatePreviewHTML()}
          className="w-full h-96 border border-gray-300 rounded-md"
          title="Blog Preview"
        ></iframe>
      </div>
    </div>
  );
};

export default CreateBlog;
