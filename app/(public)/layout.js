import { Manrope } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/Shared/NavBar";
import Footer from "@/components/Shared/Footer";
import Providers from "@/components/Shared/Providers";
import { Toaster } from "react-hot-toast";

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
        <Providers>
          <Toaster/>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
