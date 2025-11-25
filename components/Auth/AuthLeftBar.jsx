"use client";
import Image from "next/image";

export default function AuthLeftBar() {
  return (
    <div className="h-full w-[120px] bg-[#F5F5F5] relative">
      {/* Vertical left turquoise bar */}
      <div className="absolute left-0 top-0 h-full w-[6px] bg-[#0097A7]" />

      {/* Logo + Text */}
      <div className="pt-10 pl-6">
        <div className="flex flex-col items-start space-y-2">
          {/* Logo circle */}
          <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center">
            <Image
              src="/vivid-logo.png"    
              width={40}
              height={40}
              alt="VIVD Logo"
            />
          </div>

          {/* Title */}
          <div className="leading-tight">
            <p className="text-[#1A1A1A] text-[15px] font-semibold">VIVD</p>
            <p className="text-[#1A1A1A] text-[12px]">HR & Staffing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
