import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const ContactStartBanner = () => {
  return (
    <section className="relative w-full h-[75vh] min-h-[550px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/About/AboutBanner.jpg"
          alt="Contact Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        {/* Main Heading */}
        <h1 className="text-white text-[30px]  md:text-[42px] lg:text-[52px] font-semibold leading-tight mb-4">
          Let’s Start the <br /> Conversation
        </h1>

        {/* Sub text */}
        <p className="text-gray-200 text-16px md:text-[16px] max-w-lg mx-auto leading-relaxed">
          Whether you’re looking for your next opportunity or ready to grow your
          team, VIVD is here to guide you. Let’s make the connection that moves
          your goals forward.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {/* Primary Button */}
          <Link
            href="/careers"
            className="bg-[#0497AE] text-white px-6 py-3 rounded-full text-sm font-medium shadow-md hover:bg-[#03899c] transition flex items-center gap-2"
          >
            Find A Job <MdArrowOutward />
          </Link>

          {/* Secondary Button */}
          <Link
            href="/careers"
            className="bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-medium shadow-md hover:bg-gray-100 transition flex items-center gap-2"
          >
            Hire A Talent <MdArrowOutward />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactStartBanner;
