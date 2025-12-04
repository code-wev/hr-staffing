"use client";

import { SessionProvider } from "next-auth/react";
import DashboardLayout from "@/components/DashboardLayout/DashBoardLayout";
import Providers from "@/components/Shared/Providers";

export default function DashboardClientLayout({ children }) {
  return (
   <Providers>
     <SessionProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SessionProvider>
   </Providers>
  );
}
