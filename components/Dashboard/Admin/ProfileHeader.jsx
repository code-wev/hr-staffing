"use client";

import { FiPhone, FiClock, FiMail, FiMapPin } from "react-icons/fi";

export default function ProfileHeader() {
  return (
    <div className="w-full bg-[#f5f5f5] pt-16 pb-12 flex flex-col items-center text-center">
      
      {/* Name */}
      <h1 className="text-5xl font-semibold text-[#333] tracking-tight">
        John Doe
      </h1>

      {/* Contact rows */}
      <div className="mt-6 flex flex-col gap-3 text-sm text-[#4a4a4a]">

        {/* First row */}
        <div className="flex items-center justify-center gap-10">
          {/* Phone */}
          <div className="flex items-center gap-2">
            <FiPhone size={15} className="text-[#4a4a4a]" />
            <span>Phone: 714-242-8888</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <FiClock size={15} className="text-[#4a4a4a]" />
            <span>Mon - Fri: 8:00am - 5:00pm, Sat - Sun: closed</span>
          </div>
        </div>

        {/* Second row */}
        <div className="flex items-center justify-center gap-10">
          {/* Email */}
          <div className="flex items-center gap-2">
            <FiMail size={15} className="text-[#4a4a4a]" />
            <span>
              Email:{" "}
              <a href="#" className="underline">
                info@vividstaffing.com
              </a>
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <FiMapPin size={15} className="text-[#4a4a4a]" />
            <span>
              1501 E Orangethorpe Ave, Suite 120 Fullerton, CA 92831
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
