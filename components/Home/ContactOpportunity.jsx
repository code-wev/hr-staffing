import React from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const ContactOpportunity = () => {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">

        {/* LEFT IMAGE */}
        <div className="relative w-full h-[320px] md:h-auto">
          <Image
            src="/Home/contact-banner.jpg"
            alt="Find Opportunity"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* RIGHT SIDE (CENTERED CONTENT) */}
        <div className="bg-[#F5F5F5] flex items-center justify-center px-8 md:px-16 py-16 ">

          <div className="w-full max-w-md">

            {/* TITLE */}
            <h2 className="text-3xl md:text-4xl font-semibold text-[#2C2C2C] mb-4 leading-tight">
              Ready to Find Your Next Opportunity?
            </h2>

            <p className="text-[#737373] text-[15px] mb-8 leading-relaxed">
              Whether you&apos;re looking for your next career move or seeking to grow 
              your team, we&apos;re here to help. Fill out the form and let&apos;s start 
              the conversation.
            </p>

            {/* FORM */}
            <form className="space-y-5">

              <div>
                <label className="text-gray-700 text-sm mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full bg-[#ECECECCC] border-b border-gray-300 rounded-md px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-1 block">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="w-full bg-[#ECECECCC] border-b border-gray-300 rounded-md px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-1 block">Phone Number</label>
                <div className="flex gap-2">
                  <select className="bg-[#ECECECCC] border-b border-gray-300 rounded-md px-3 py-3 text-sm outline-none">
                    <option>+1</option>
                    <option>+44</option>
                    <option>+49</option>
                    <option>+61</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Enter Your Phone Number"
                    className="w-full bg-[#ECECECCC] border-b border-gray-300 rounded-md px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-1 block">Your Message</label>
                <textarea
                  rows={3}
                  placeholder="Write Your Message"
                  className="w-full bg-[#ECECECCC] border-b border-gray-300 rounded-md px-4 py-1 h-12 text-sm outline-none resize-none"
                ></textarea>
              </div>

              <div className="mt-3 space-y-2">
                <p className="text-[#737373] text-sm font-medium">
                  I Would Like To Receive Information About
                </p>

                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="w-4 h-4" /> Job Openings
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="w-4 h-4" /> Hiring &amp; New Updates
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="w-4 h-4" /> I agree to the Policies and Terms
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex items-center w-full gap-2 bg-[#353434] text-white px-10 py-3 text-sm shadow hover:bg-gray-900 transition"
              >
                See What We Can Do For You
                <FiArrowUpRight className="text-[16px]" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactOpportunity;
