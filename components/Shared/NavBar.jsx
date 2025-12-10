"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Staffing Services", path: "/staffing-services" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full bg-[#0097B2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LEFT — Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={70}
            height={70}
            className="rounded-full cursor-pointer"
          />
        </Link>

        {/* CENTER — Desktop Menu */}
        <div className="hidden md:flex items-center space-x-5 text-white text-[16px]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="relative pb-1 hover:opacity-80 transition"
            >
              {item.name}
              {pathname === item.path && (
                <span className="absolute left-0 -bottom-[2px] w-full h-[1px] bg-white"></span>
              )}
            </Link>
          ))}
        </div>

        {/* RIGHT — Desktop Button */}
        <div className="hidden md:block">
          <Link
            href={session ? "/dashboard" : "/auth/signin"}
            className="bg-white text-[16px] px-6 py-2 rounded-full shadow-sm hover:bg-gray-100 transition flex items-center gap-1"
          >
            Get Started <MdArrowOutward />
          </Link>
        </div>

        {/* MOBILE — Hamburger Icon */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-3xl"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <div className="md:hidden bg-[#0097B2] text-white px-6 py-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className="block text-[16px] pb-1 relative w-fit"
            >
              {item.name}

              {/* FIXED MOBILE UNDERLINE */}
              {pathname === item.path && (
                <span className="absolute left-0 bottom-0 h-[1px] bg-white w-full"></span>
              )}
            </Link>
          ))}

          {/* MOBILE Get Started Button */}
          <Link
            href={session ? "/dashboard" : "/auth/signin"}
            onClick={() => setOpen(false)}
            className="block bg-white text-[#0097B2] text-[16px] w-fit px-6 py-2 rounded-full shadow-sm hover:bg-gray-100 transition flex items-center gap-1"
          >
            Get Started <MdArrowOutward />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
