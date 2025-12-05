import React, { useState } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

const CareerBanner = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const handleSearchClick = () => {
    onSearch({
      searchText,
      searchLocation,
      searchCategory,
    });
  };

  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Career/careerbanner.jpg"
        alt="Career Banner"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Search Bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full flex justify-center px-4">
        <div
          className="
          bg-white 
          border border-[#E4E4E4]
          flex 
          rounded-full
          items-center 
          w-full
          max-w-4xl
          h-[48px]
        "
        >
          {/* Search Jobs */}
          <div className="flex-1 px-4 h-full flex items-center">
            <input
              type="text"
              placeholder="Search Jobs...."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-transparent outline-none text-[14px] placeholder:text-[#AFAFAF]"
            />
          </div>

          <div className="w-px bg-[#E4E4E4] h-[60%]"></div>

          {/* Location */}
          <div className="flex-1 px-4 h-full flex items-center">
            <input
              type="text"
              placeholder="Search Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full bg-transparent outline-none text-[14px] placeholder:text-[#AFAFAF]"
            />
          </div>

          <div className="w-px bg-[#E4E4E4] h-[60%]"></div>

          {/* Categories */}
          <div className="flex-1 px-4 h-full flex items-center">
            <input
              type="text"
              placeholder="Categories"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full bg-transparent outline-none text-[14px] placeholder:text-[#AFAFAF]"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            className="
              w-12
              h-[48px] 
              bg-[#3C3C3C]
              flex 
              items-center 
              justify-center 
              rounded-r-full
            "
          >
            <FiSearch className="text-white text-[16px]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CareerBanner;
