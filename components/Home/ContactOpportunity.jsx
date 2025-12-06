"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

const ContactOpportunity = () => {
  // Form state
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
    subscribe_job: false,
    subscribe_updates: false,
    agree_terms: false,
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Send Email via EmailJS
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      subscribe_job: form.subscribe_job ? "Yes" : "No",
      subscribe_updates: form.subscribe_updates ? "Yes" : "No",
      agree_terms: form.agree_terms ? "Agreed" : "Not Agreed",
      title: "New Contact Request",
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      toast.success("Message sent successfully!");

      // Reset form
      setForm({
        full_name: "",
        email: "",
        phone: "",
        message: "",
        subscribe_job: false,
        subscribe_updates: false,
        agree_terms: false,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section className="w-full bg-white">
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">

        {/* LEFT IMAGE */}
        <div className="relative w-full h-[320px] md:h-auto">
          <Image
            src="/Home/contact-banner.jpg"
            alt="Find Opportunity"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#F5F5F5] flex items-center justify-center px-8 md:px-16 py-16 ">
          <div className="w-full max-w-md">

            {/* TITLE */}
            <h2 className="text-3xl md:text-4xl font-semibold text-[#2C2C2C] mb-4 leading-tight">
              Ready to Find Your Next Opportunity?
            </h2>

            <p className="text-[#737373] text-[15px] mb-8 leading-relaxed">
              Whether you&apos;re looking for your next career move or seeking to grow 
              your team, we&apos;re here to help. Fill out the form and let&apos;s start 
              the conversation.
            </p>

            {/* FORM */}
            <form className="space-y-5" onSubmit={sendEmail}>
              <div>
                <label className="text-gray-700 text-sm mb-1 block">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  required
                  className="w-full bg-[#ECECECCC] border-b border-gray-300 rounded-md px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-1 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email Address"
                  required
                  className="w-full bg-[#ECECECCC] border-b border-gray-300 rounded-md px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-1 block">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter Your Phone Number"
                  required
                  className="w-full bg-[#ECECECCC] border-b border-gray-300 rounded-md px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-1 block">Your Message</label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write Your Message"
                  required
                  className="w-full bg-[#ECECECCC] border-b border-gray-300 rounded-md px-4 py-1 h-12 text-sm outline-none resize-none"
                ></textarea>
              </div>

              <div className="mt-3 space-y-2">
                <p className="text-[#737373] text-sm font-medium">
                  I Would Like To Receive Information About
                </p>

                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="subscribe_job"
                    checked={form.subscribe_job}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  Job Openings
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="subscribe_updates"
                    checked={form.subscribe_updates}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  Hiring & New Updates
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="agree_terms"
                    checked={form.agree_terms}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  I agree to the Policies and Terms
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 inline-flex items-center w-full gap-2 bg-[#353434] text-white px-10 py-3 text-sm shadow hover:bg-gray-900 transition"
              >
                {loading ? "Sending..." : "See What We Can Do For You"}
                <FiArrowUpRight className="text-[16px]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactOpportunity;
