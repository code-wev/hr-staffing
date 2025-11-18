import { Manrope } from "next/font/google";
import "./globals.css";

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
    <html>
      <body className={manrope.className}>
        {children}
      </body>
    </html>
  );
}
