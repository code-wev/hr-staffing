import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0097B2] text-white py-12">
      <div className="mx-auto px-26">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* LEFT SECTION */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="VIVID"
                width={70}
                height={70}
                className="rounded-full"
              />
              <span className="text-lg font-semibold">VIVID</span>
            </div>

            <p className="text-sm leading-relaxed max-w-xs opacity-90">
              We’re dedicated to bridging the gap between skilled professionals
              and employers seeking excellence. Our platform streamlines
              recruitment and empowers applicants to showcase their talent.
            </p>

            <p className="text-sm leading-relaxed max-w-xs opacity-90 mt-4">2 North Central Ave, Suite 1800, Phoenix, AZ 85004</p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-5">
              <FaFacebookF className="text-white text-[16px] cursor-pointer hover:opacity-80" />
              <FaInstagram className="text-white text-[16px] cursor-pointer hover:opacity-80" />
              <FaWhatsapp className="text-white text-[16px] cursor-pointer hover:opacity-80" />
            </div>
          </div>

          {/* MIDDLE COLUMN - PAGES */}
          <div className="text-sm">
            <h4 className="font-semibold mb-3 opacity-90">Pages</h4>
            <ul className="space-y-2 opacity-90">
              <li><Link href="/home">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* RIGHT COLUMN - SERVICES */}
          <div className="text-sm">
            <h4 className="font-semibold mb-3 opacity-90">Services</h4>
            <ul className="space-y-2 opacity-90">
              <li><Link href="/services">All Services</Link></li>
              <li><Link href="/staffing-services">Staffing Services</Link></li>
              <li><Link href="/direct-placement">Direct Placement</Link></li>
              <li><Link href="/executive-recruitment">Executive Recruitment</Link></li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-white/40 mt-10 mb-6"></div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row justify-between text-xs opacity-90">
          <p>All rights reserved by VIVID © 2025</p>
          <Link href="/privacy-policy" className="hover:opacity-100 transition">
            Privacy Policy
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
