import React from "react";
import Image from "next/image";
import {
  FiPhone,
  FiMail,
  FiClock,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";

const ContactUsSection = () => {
  return (
    <section className="w-full h-auto md:h-[660px] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* LEFT SIDE GRAY PANEL */}
        <div className="bg-[#707070] flex items-center px-10 md:px-20 py-14 md:py-0">
          <div className="text-white max-w-md">
            {/* Heading */}
            <h2 className="text-[26px] md:text-[32px] font-semibold mb-6">
              Contact Us
            </h2>

            {/* Contact Details */}
            <ul className="space-y-4 text-[16px] leading-relaxed">
              <li className="flex items-center gap-3">
                <FiPhone className="text-white text-[18px]" />
                Phone: 714-242-8888
              </li>

              <li className="flex items-center gap-3">
                <FiMail className="text-white text-[18px]" />
                <a href="mailto:info@vividstaffing.com" className="underline">
                  info@vividstaffing.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FiClock className="text-white text-[18px]" />
                Mon - Fri: 8:00am - 5:00pm, Sat - Sun: Closed
              </li>

              <li className="flex items-start gap-3">
                <FiMapPin className="text-white text-[18px] mt-1" />
                1501 E Orangethorpe Ave, Suite 120
                <br />
                Fullerton, CA 92831
              </li>
            </ul>

            {/* Button */}
            <button className="mt-8 bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-100 transition">
              Send Us An Email
              <FiArrowUpRight className="text-[16px]" />
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-[260px] md:h-full w-full">
          <Image
            src="/contact/contact2.jpg"
            alt="Contact Team"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
