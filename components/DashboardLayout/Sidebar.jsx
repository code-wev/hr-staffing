"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX, FiGrid, FiUsers } from "react-icons/fi";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { PiBagSimpleFill } from "react-icons/pi";
import { IoIosListBox } from "react-icons/io";

export default function Sidebar({ onClose }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // 🔥 Get role from session (client / applicant / admin)
  const role = session?.user?.role;

  // ================================
  // ROLE-BASED MENU CONFIG
  // ================================
  const menuByRole = {
    client: [
      { name: "Dashboard", icon: <FiGrid />, href: "/dashboard" },

      {
        name: "Create job post",
        icon: <FiUsers />,
        href: "/dashboard/create-job",
      },
      {
        name: "My Jobs",
        icon: <PiBagSimpleFill />,
        href: "/dashboard/my-jobs",
      },
    ],

    applicant: [
      { name: "Dashboard", icon: <FiGrid />, href: "/dashboard" },

      {
        name: "My Application",
        icon: <IoIosListBox />,
        href: "/dashboard/my-application",
      },
    ],

    admin: [{ name: "Dashboard", icon: <FiGrid />, href: "/dashboard" }],
  };

  // Default fallback if no session yet
  const sidebarItems = menuByRole[role] || [
    { name: "Dashboard", icon: <FiGrid />, href: "/dashboard" },
  ];

  const handleLinkClick = () => {
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside className="w-[240px] h-screen bg-[#0097B2] text-white flex flex-col">
      {/* LOGO + TITLE */}

      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/20">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={42}
            height={42}
            className="rounded-full border border-white/40"
          />
          <h2 className="text-lg font-semibold">Board</h2>
        </Link>

        <button
          onClick={onClose}
          className="lg:hidden ml-auto p-2 rounded-md hover:bg-white/10"
        >
          <FiX className="text-xl text-white" />
        </button>
      </div>

      {/* MENU */}
      <nav className="flex flex-col mt-4 px-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-5 py-3 mb-2 rounded-r-full text-[15px] font-medium transition-all
                ${isActive ? "bg-white/20" : "opacity-90 hover:bg-white/10"}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
