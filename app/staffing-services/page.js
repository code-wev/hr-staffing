import FutureOfWork from "@/components/Home/FutureOfWork";
import KeyServices from "@/components/Staffing-Services/KeyServices";
import StaffServBanner from "@/components/Staffing-Services/StaffServBanner";
import WhyChooseUs from "@/components/Staffing-Services/WhyChooseUs";
import React from "react";

const page = () => {
  return (
    <div>
      <StaffServBanner />
      <KeyServices />
      <WhyChooseUs />
      <FutureOfWork />
    </div>
  );
};

export default page;
