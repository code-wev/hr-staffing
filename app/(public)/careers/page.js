'use client'
import CareerBanner from "@/components/Career/CareerBanner";
import JobList from "@/components/Career/JobList";
import FutureOfWork from "@/components/Home/FutureOfWork";
import React, { useState } from "react";

const Page = () => {

  const [filters, setFilters] = useState({
    searchText: "",
    searchLocation: "",
    searchCategory: "",
  });

  const handleSearch = (values) => {
    setFilters(values);
  };

  return (
    <div>
      <CareerBanner onSearch={handleSearch} />
      <JobList
        searchText={filters.searchText}
        searchLocation={filters.searchLocation}
        searchCategory={filters.searchCategory}
      />

      <FutureOfWork />
    </div>
  );
};

export default Page;
