"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown, FiGrid, FiUser, FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";

export default function DashboardNavbar({ onMenuClick }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [profile, setProfile] = useState(null);

  // Fetch real user profile from DB (NOT session)
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load navbar profile:", err);
      }
    }
    loadProfile();
  }, []);

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

  // Determine displayed name based on role
  const displayName =
    profile?.role === "client"
      ? profile?.companyName || "Company Name"
      : profile?.name || "User";

  const displayImage =
    profile?.profileImage && profile.profileImage.trim() !== ""
      ? profile.profileImage
      : "/profile.jpg"; // <- placeholder image

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center"
          onClick={onMenuClick}
        >
          <FiGrid className="text-gray-600" size={18} />
        </button>

        <div className="w-px h-6 bg-gray-300"></div>

        <h2 className="text-gray-700 text-sm font-medium">Dashboard</h2>
      </div>

      {/* RIGHT SECTION — DROPDOWN */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50"
        >
          {/* Profile Image */}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={displayImage}
              width={32}
              height={32}
              alt="User Profile"
              className="rounded-full object-cover"
            />
          </div>

          {/* Name */}
          <span className="text-gray-800 text-sm font-medium">
            {displayName}
          </span>

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

            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <FiLogOut size={16} className="text-gray-600" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
