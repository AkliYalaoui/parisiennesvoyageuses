"use client";

import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaShareAlt } from "react-icons/fa";

const SocialShare = ({ title }) => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(title);
  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
  };
  return (
    <>
      <div className="flex space-x-4">
        <FaShareAlt className="text-gray-400"/>
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          <FaTwitter />
        </a>
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <FaFacebook />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900"
        >
          <FaLinkedin />
        </a>
        <a
          href={socialLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800"
        >
          <FaWhatsapp />
        </a>
      </div>
    </>
  );
};

export default SocialShare;
