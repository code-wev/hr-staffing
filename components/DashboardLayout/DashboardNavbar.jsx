"use client";

import { FiMenu } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function DashboardNavbar({ onMenuClick }) {
  return (
    <header className="w-full bg-white border-b border-gray-200 h-[70px] flex items-center justify-between px-6 sticky top-0 z-40">

      {/* LEFT — MENU ICON (mobile) + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <FiMenu className="text-2xl text-gray-600" />
        </button>

        {/* Breadcrumb Icon */}
        <span className="text-gray-400 text-xl">🗂️</span>

        {/* Page Title */}
        <h2 className="text-gray-700 text-lg font-medium">Dashboard</h2>
      </div>

      {/* RIGHT — USER PROFILE */}
      <div className="flex items-center gap-3">
        {/* User Avatar */}
        <Image
          src="/avatar.png"  
          width={36}
          height={36}
          alt="User"
          className="rounded-full border"
        />

        {/* Name + Arrow */}
        <button className="flex items-center gap-1 text-gray-700 font-medium hover:opacity-80">
          John Doe
          <FiChevronDown className="text-xl" />
        </button>
      </div>

    </header>
  );
}
