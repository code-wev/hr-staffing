"use client";

import { useState } from "react";
import Image from "next/image";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import Link from "next/link";

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState("client");

  // 🔹 Form States (missing before)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔹 Signup Handler
  async function handleSignup(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        role: activeTab, // client/applicant
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
    } else {
      alert("Account created successfully!");
      window.location.href = "/auth/signin";
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex relative">

      {/* LEFT COLOR BAR — 8px Teal Stripe */}
      <div className="absolute left-0 top-0 h-full w-[10px] bg-[#008297]" />

      {/* ======= PAGE WIDTH WRAPPER ======= */}
      <div className="flex flex-col flex-1">

        {/* ============== TOP BAR ============== */}
        <div className="w-full flex items-center justify-between px-10 py-6">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                width={50}
                height={50}
                alt="logo"
                className="rounded-full"
              />
              <div className="leading-tight">
                <p className="font-semibold text-[#1A1A1A] text-[14px]">VIVD</p>
                <p className="text-[12px] text-gray-500 -mt-1">HR & Staffing</p>
              </div>
            </div>
          </Link>
        </div>

        {/* ============== SIGNUP CARD ============== */}
        <div className="flex flex-1 items-center justify-center pb-10">
          <div className="bg-white w-[450px] rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] px-10 py-10">

            <h1 className="text-center text-[22px] font-semibold mb-8">
              Create Your Account
            </h1>

            {/* ============== TABS ============== */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex bg-[#F0F2F4] rounded-full p-1 w-full">

                <button
                  onClick={() => setActiveTab("client")}
                  className={`flex-1 py-2 rounded-full text-[14px] font-medium transition
                    ${activeTab === "client" ? "bg-[#008297] text-white shadow-md" : "text-gray-600"}`}
                >
                  Sign up as Client
                </button>

                <button
                  onClick={() => setActiveTab("applicant")}
                  className={`flex-1 py-2 rounded-full text-[14px] font-medium transition
                    ${activeTab === "applicant" ? "bg-[#008297] text-white shadow-md" : "text-gray-600"}`}
                >
                  Sign up as Applicant
                </button>

              </div>
            </div>

            {/* ============== FORM ============== */}
            <div className="space-y-5">

              {/* FULL NAME */}
              <div>
                <label className="text-[13px] text-gray-600">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md bg-[#F7F8FA] text-[14px]
                      outline-none focus:ring-1 focus:ring-[#008297]"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-[13px] text-gray-600">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md bg-[#F7F8FA] text-[14px]
                      outline-none focus:ring-1 focus:ring-[#008297]"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-[13px] text-gray-600">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md bg-[#F7F8FA] text-[14px]
                      outline-none focus:ring-1 focus:ring-[#008297]"
                  />
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-[13px] text-gray-600">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md bg-[#F7F8FA] text-[14px]
                      outline-none focus:ring-1 focus:ring-[#008297]"
                  />
                </div>
              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={handleSignup}
              className="w-full mt-8 py-3 bg-[#008297] hover:bg-[#006d7b] text-white text-[15px]
                rounded-md transition font-medium"
            >
              Create Account
            </button>

            {/* FOOTER */}
            <div className="flex items-center justify-between mt-6 text-[13px]">
              <Link href="/auth/signin" className="text-[#008297] hover:underline">
                Already have an account?
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
