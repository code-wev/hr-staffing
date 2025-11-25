"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown, FiGrid, FiUser, FiLogOut } from "react-icons/fi";

export default function DashboardNavbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        {/* Icon Box */}
        <div className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center">
          <FiGrid className="text-gray-600" size={18} />
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Title */}
        <h2 className="text-gray-700 text-sm font-medium">Dashboard</h2>
      </div>

      {/* RIGHT SECTION — DROPDOWN */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/profile.jpg"
              width={32}
              height={32}
              alt="User"
              className="rounded-full object-cover"
            />
          </div>

          <span className="text-gray-800 text-sm font-medium">John Doe</span>

          <FiChevronDown className="text-gray-600" size={18} />
        </button>

        {/* DROPDOWN MENU */}
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-md py-1 z-50">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <FiUser size={16} className="text-gray-600" />
              Profile
            </Link>

            <hr className="my-1 border-gray-200" />

            <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FiLogOut size={16} className="text-gray-600" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
