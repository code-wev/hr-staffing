import AboutSection from "@/components/Home/AboutSection";
import ContactOpportunity from "@/components/Home/ContactOpportunity";
import FutureOfWork from "@/components/Home/FutureOfWork";
import HomeBanner from "@/components/Home/HomeBanner";
import ImpactSection from "@/components/Home/ImpactSection";
import IndustryExpertise from "@/components/Home/IndustryExpertise";

export default function Page() {
  return (
    <div>
      <HomeBanner />
      <ImpactSection />
      <AboutSection />
      <IndustryExpertise />
      <ContactOpportunity />
      <FutureOfWork />
    </div>
  );
}
