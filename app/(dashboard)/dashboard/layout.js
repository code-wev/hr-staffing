"use client";

import { SessionProvider } from "next-auth/react";
import DashboardLayout from "@/components/DashboardLayout/DashBoardLayout";

export default function DashboardClientLayout({ children }) {
  return (
    <SessionProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SessionProvider>
  );
}
