import ContactStartBanner from "@/components/Contact/ContactStartBanner";
import ContactUsSection from "@/components/Contact/ContactUsSection";
import GetInTouch from "@/components/Contact/GetInTouch";
import ContactOpportunity from "@/components/Home/ContactOpportunity";
import FutureOfWork from "@/components/Home/FutureOfWork";
import React from "react";

const page = () => {
  return (
    <div>
      <ContactStartBanner />
      <GetInTouch />
      <ContactUsSection />
      <ContactOpportunity />
      <FutureOfWork />
    </div>
  );
};

export default page;
