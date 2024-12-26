"use client";

import Link from "next/link";
import { FaInstagramSquare, FaPinterestSquare } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-orange-950">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between p-4 text-white">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold italic">
            Parisiennes<sub>voyageuses</sub>
          </Link>

          {/* Hamburger Menu */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          {/* Links for Larger Screens */}
          <ul className="hidden md:flex flex-row items-center space-x-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/content/guide">Travel</Link>
            </li>
            <li>
              <Link href="/content/blog">Blog</Link>
            </li>
            <li>
              <Link href="/content/about">About</Link>
            </li>
            <li>
              <Link href="/content/contact">Contact Us</Link>
            </li>
          </ul>

          {/* Social Media Icons */}
          <ul className="hidden md:flex items-center space-x-4">
            <li>
              <Link href="https://instagram.com" target="_blank">
                <FaInstagramSquare size={30} className="text-pink-100" />
              </Link>
            </li>
            <li>
              <Link href="https://pinterest.com" target="_blank">
                <FaPinterestSquare size={30} className="text-red-100" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Full-Screen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-orange-950 z-20 flex flex-col items-center justify-center text-white">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-3xl font-bold"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          {/* Menu Links */}
          <ul className="flex flex-col items-center space-y-6 text-2xl">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/content/guide" onClick={() => setMenuOpen(false)}>
                Travel
              </Link>
            </li>
            <li>
              <Link href="/content/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/content/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/content/contact" onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Social Media Icons */}
          <ul className="flex items-center space-x-6 mt-8">
            <li>
              <Link
                href="https://instagram.com"
                target="_blank"
                onClick={() => setMenuOpen(false)}
              >
                <FaInstagramSquare size={40} className="text-pink-100" />
              </Link>
            </li>
            <li>
              <Link
                href="https://pinterest.com"
                target="_blank"
                onClick={() => setMenuOpen(false)}
              >
                <FaPinterestSquare size={40} className="text-red-100" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
