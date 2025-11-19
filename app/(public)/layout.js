import { Manrope } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/Shared/NavBar";
import Footer from "@/components/Shared/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "HR & Staffing",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
