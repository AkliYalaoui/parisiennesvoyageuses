"use client";

import sendEMail from "@/app/lib/sendEMail";
import { useActionState } from 'react';
import { FiMail, FiUser, FiMessageCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const page = () => {
  const [messages, formAction, isPending] = useActionState(sendEMail, null);

  return (
    <section className="px-4">
      <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange-900 mb-6">
        Contact Us
      </h1>

      <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
        Have a question or need assistance? We're here to help! Please fill out the form below, 
        and our team will get back to you as soon as possible.
      </p>

      {messages?.error && (
        <div className="max-w-4xl mx-auto bg-red-200 border border-red-800 text-red-950 p-4 rounded-lg mb-6">
          <p className="flex items-center">
            <FiMessageCircle className="mr-2 text-red-800" />
            <strong>Message was not sent</strong>! We are sorry, something went wrong. 
            <em className="ml-1">But we're still reachable via Instagram.</em>
          </p>
        </div>
      )}

      {messages?.success && (
        <div className="max-w-4xl mx-auto bg-green-200 border border-green-800 text-green-950 p-4 rounded-lg mb-6">
          <p className="flex items-center">
            <FiMail className="mr-2 text-green-800" />
            <strong>Message sent successfully</strong>! We will get back to you as soon as possible. 
            <em className="ml-1">We're also reachable via Instagram.</em>
          </p>
        </div>
      )}

      <form
        action={formAction}
        className="max-w-4xl mx-auto shadow-lg p-8 bg-white rounded-lg border-t-4 border-orange-500"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-800 font-semibold mb-2"
          >
            <FiUser className="inline mr-1 text-orange-600" /> Name <strong className="text-red-500">*</strong>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your full name"
            required
          />
          {messages?.name && <p className="mt-2 text-sm text-red-500">{messages?.name}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-800 font-semibold mb-2"
          >
            <FiMail className="inline mr-1 text-orange-600" /> Email <strong className="text-red-500">*</strong>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your email address"
            required
          />
          {messages?.email && <p className="mt-2 text-sm text-red-500">{messages?.email}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-gray-800 font-semibold mb-2"
          >
            <FiMessageCircle className="inline mr-1 text-orange-600" /> Subject <strong className="text-red-500">*</strong>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter the subject of your message"
            required
          />
          {messages?.subject && <p className="mt-2 text-sm text-red-500">{messages?.subject}</p>}
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-800 font-semibold mb-2"
          >
            <FiMessageCircle className="inline mr-1 text-orange-600" /> Your Message <strong className="text-red-500">*</strong>
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Type your message here..."
            required
          ></textarea>
          {messages?.message && <p className="mt-2 text-sm text-red-500">{messages?.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center items-center bg-orange-800 hover:bg-orange-900 text-white font-semibold py-3 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin mr-2" /> Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </section>
  );
};

export default page;
