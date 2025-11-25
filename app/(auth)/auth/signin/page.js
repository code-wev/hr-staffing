"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { FiLock, FiMail } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      alert(res.error);
      return;
    }

    router.push("/");
  }

  return (
    <>
      {/* Show error from URL */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-3">
          {error === "CredentialsSignin"
            ? "Invalid email or password"
            : error}
        </p>
      )}

      {/* ============== FORM ============== */}
      <form className="space-y-5" onSubmit={handleLogin}>
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
              className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md 
              bg-[#F7F8FA] text-[14px]
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
              className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md 
              bg-[#F7F8FA] text-[14px]
              outline-none focus:ring-1 focus:ring-[#008297]"
            />
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="w-full mt-8 py-3 bg-[#008297] hover:bg-[#006d7b] text-white text-[15px]
          rounded-md transition font-medium"
        >
          Sign In
        </button>
      </form>
    </>
  );
}

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] flex relative">
      {/* LEFT COLOR BAR */}
      <div className="absolute left-0 top-0 h-full w-[10px] bg-[#008297]" />

      <div className="flex flex-col flex-1">
        {/* TOP BAR */}
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
                <p className="text-[12px] text-gray-500 -mt-1">
                  HR & Staffing
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* SIGNIN CARD */}
        <div className="flex flex-1 items-center justify-center pb-10">
          <div className="bg-white w-[450px] rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] px-10 py-10">

            <h1 className="text-center text-[22px] font-semibold mb-8">
              Sign In
            </h1>

            {/* FIX: WRAP ONLY THE PART USING useSearchParams */}
            <Suspense fallback={<div>Loading...</div>}>
              <SigninForm />
            </Suspense>

            {/* FOOTER LINK */}
            <div className="flex items-center justify-between mt-6 text-[13px]">
              <Link href="/auth/signup" className="text-[#008297] hover:underline">
                Don’t have an account?
              </Link>

              <Link href="/auth/forgot" className="text-[#008297] hover:underline">
                Forgot password?
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
