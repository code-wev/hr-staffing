import AboutBanner from "@/components/About/AboutBanner";
import MissionSection from "@/components/About/MissionSection";
import FutureOfWork from "@/components/Home/FutureOfWork";
import React from "react";

const page = () => {
  return (
    <div>
      <AboutBanner />
      <MissionSection />
      <FutureOfWork />
    </div>
  );
};

export default page;
