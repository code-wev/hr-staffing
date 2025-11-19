import { Manrope } from "next/font/google";
import "../../globals.css";
import DashboardLayout from "@/components/DashboardLayout/DashBoardLayout";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "HR & Staffing",
  description: "",
};

export default function DashboardRootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
