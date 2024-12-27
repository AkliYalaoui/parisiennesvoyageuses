"use client";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }], // Text alignment
    [{ color: [] }, { background: [] }], // Text and background color
    ["link", "image"],
    ["clean"], // Clear formatting
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "align", // Add align to formats
  "color", // Add color to formats
  "background", // Add background color to formats
  "link",
  "image",
];

const Editor = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className="mt-2 border border-gray-300 rounded-md"
      theme="snow"
      placeholder="Write your blog content here..."
    />
  );
};

export default Editor;
