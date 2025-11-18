"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Staffing Services", path: "/staffing-services" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full bg-[#0097B2]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LEFT — Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"      
              alt="logo"
              width={55}
              height={55}
              className="rounded-full cursor-pointer"
            />
          </Link>
        </div>

        {/* CENTER — Menu */}
        <div className="flex items-center space-x-5 text-white text-[16px]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="relative pb-1 hover:opacity-80 transition"
            >
              {item.name}

              {/* underline active link */}
              {pathname === item.path && (
                <span className="absolute left-0 -bottom-[2px] w-full h-[1px] bg-white"></span>
              )}
            </Link>
          ))}
        </div>

        {/* RIGHT — Get Started Button */}
        <div>
          <Link
            href="/get-started"
            className="bg-white text-[16px] px-6 py-2 rounded-full shadow-sm hover:bg-gray-100 transition flex items-center gap-1"
          >
            Get Started <MdArrowOutward />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
