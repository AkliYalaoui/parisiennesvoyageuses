"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaHome,
  FaRegCommentDots,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { createClient } from "@/app/config/supabaseBrowserClient";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const supabase = createClient();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const router = useRouter();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top App Bar */}
      <header className="flex items-center justify-between bg-white shadow-md px-6 h-16 z-10">
        <button
          onClick={toggleDrawer}
          className="text-amber-950 hover:text-amber-600 focus:outline-none"
        >
          <FaBars size={24} />
        </button>
        <Link href="/" className="sm:text-lg font-semibold text-amber-950">
          Parisiennes voyageuses
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center text-amber-950 hover:text-red-600 focus:outline-none"
        >
          <FaSignOutAlt size={20} className="mr-2" />
          Logout
        </button>
      </header>

      {/* Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg h-full transition-all duration-300 ${
            isDrawerOpen ? "w-64" : "w-16"
          }`}
        >
          <nav className="flex flex-col h-full">
            <ul className="mt-4">
              <li>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center hover:bg-gray-200 px-4 py-3"
                >
                  <FaHome className="text-amber-950" size={20} />
                  {isDrawerOpen && (
                    <span className="ml-4 text-gray-700">Dashboard</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/blogs"
                  className="flex items-center hover:bg-gray-200 px-4 py-3"
                >
                  <FaRegCommentDots className="text-amber-950" size={20} />
                  {isDrawerOpen && (
                    <span className="ml-4 text-gray-700">Blogs</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/blogs"
                  className="flex items-center hover:bg-gray-200 px-4 py-3"
                >
                  <FaFileInvoiceDollar className="text-amber-950" size={20} />
                  {isDrawerOpen && (
                    <span className="ml-4 text-gray-700">Invoices</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/settings"
                  className="flex items-center hover:bg-gray-200 px-4 py-3"
                >
                  <FaCog className="text-amber-950" size={20} />
                  {isDrawerOpen && (
                    <span className="ml-4 text-gray-700">Settings</span>
                  )}
                </Link>
              </li>
            </ul>
            <div className="mt-auto mb-4 px-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center text-red-600 hover:text-red-800"
              >
                <FaSignOutAlt size={20} />
                {isDrawerOpen && <span className="ml-2">Logout</span>}
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
