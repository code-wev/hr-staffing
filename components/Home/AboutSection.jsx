import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const AboutSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="flex flex-col md:flex-row w-full h-[720px]">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 bg-[#6F6F6F] text-white flex items-center px-10 md:px-16">
          <div className="">

            <h2 className="text-3xl md:text-[32px] font-semibold mb-16">
              Built on Purpose. Driven by People.
            </h2>

            <p className="text-[16px] text-gray-200 mb-8">
              We’re more than a staffing agency — we’re a people company. Our mission is to help
              professionals find purpose-driven work and help businesses build teams that thrive.
              With years of experience in recruitment and talent development, we’ve built
              relationships based on trust, care, and results.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-medium shadow hover:bg-gray-100 transition"
            >
              Learn More About Us <FiArrowUpRight className="text-[16px]" />
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-full md:w-1/2 relative">
          <Image
            src="/Home/purpose.jpg"
            alt="Team Working"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
