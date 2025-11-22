"use client";

import { FiPhone, FiClock, FiMail, FiMapPin, FiEyeOff } from "react-icons/fi";

export default function Profile() {
  return (
    <div className="w-full">
      {/* TOP HEADER */}
      <div className="w-full bg-[#f5f5f5] pt-16 pb-12 flex flex-col items-center text-center">
        <h1 className="text-5xl font-semibold text-[#333] tracking-tight">
          John Doe
        </h1>

        <div className="mt-6 flex flex-col gap-3 text-sm text-[#4a4a4a]">

          {/* ROW 1 */}
          <div className="flex items-center justify-center gap-10">
            <div className="flex items-center gap-2">
              <FiPhone size={15} />
              <span>Phone: 714-242-8888</span>
            </div>

            <div className="flex items-center gap-2">
              <FiClock size={15} />
              <span>Mon - Fri: 8:00am - 5:00pm, Sat - Sun: closed</span>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="flex items-center justify-center gap-10">
            <div className="flex items-center gap-2">
              <FiMail size={15} />
              <span>
                Email:{" "}
                <a className="underline" href="#">
                  info@vividstaffing.com
                </a>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FiMapPin size={15} />
              <span>
                1501 E Orangethorpe Ave, Suite 120 Fullerton, CA 92831
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* CHANGE PASSWORD SECTION */}
      <div className="w-full mx-auto px-6 mt-10">

        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Change Password
        </h2>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Current Password */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:outline-none"
                defaultValue="******"
              />
              <FiEyeOff
                size={18}
                className="absolute right-3 top-3.5 text-gray-500"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-700">
              New Password Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:outline-none"
                defaultValue="******"
              />
              <FiEyeOff
                size={18}
                className="absolute right-3 top-3.5 text-gray-500"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:outline-none"
                defaultValue="******"
              />
              <FiEyeOff
                size={18}
                className="absolute right-3 top-3.5 text-gray-500"
              />
            </div>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-10">
          <button className="px-6 py-2.5 border rounded-md text-gray-700 text-sm bg-white hover:bg-gray-50">
            Discard
          </button>

          <button className="px-6 py-2.5 rounded-md text-white text-sm bg-[#0694A2] hover:bg-[#057b87]">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
