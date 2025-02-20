"use client";

import sendEMail from "@/app/lib/sendEMail";
import { useActionState } from "react";
import { FiMail, FiUser, FiMessageCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTranslations } from "next-intl";

const page = () => {
  const [messages, formAction, isPending] = useActionState(sendEMail, null);
  const t = useTranslations("ContactPage");
  return (
    <section className="px-4">
      <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6">
        {t("title")}
      </h1>

      <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
        {t("p1")}
      </p>

      {messages?.error && (
        <div className="max-w-4xl mx-auto bg-red-200 border border-red-800 text-slate-950 p-4 rounded-lg mb-6">
          <p className="flex items-center">
            <FiMessageCircle className="mr-2 text-red-800" />
            <strong>{t("notM")}</strong>
            {t("wrong")}
            <em className="ml-1">{t("reach")}</em>
          </p>
        </div>
      )}

      {messages?.success && (
        <div className="max-w-4xl mx-auto bg-green-200 border border-green-800 text-green-950 p-4 rounded-lg mb-6">
          <p className="flex items-center">
            <FiMail className="mr-2 text-green-800" />
            <strong>{t("m")}</strong>
            {t("getBack")}
            <em className="ml-1">{t("reachable")}</em>
          </p>
        </div>
      )}

      <form
        action={formAction}
        className="max-w-4xl mx-auto shadow-lg p-8 bg-white rounded-lg border-t-4 border-slate-500"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-800 font-semibold mb-2"
          >
            <FiUser className="inline mr-1 text-slate-600" /> {t("name")}{" "}
            <strong className="text-red-500">*</strong>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder={t("namePlaceholder")}
            required
          />
          {messages?.name && (
            <p className="mt-2 text-sm text-red-500">{t(messages?.name)}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-800 font-semibold mb-2"
          >
            <FiMail className="inline mr-1 text-slate-600" /> {t("email")}{" "}
            <strong className="text-red-500">*</strong>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder={t("emailPlaceholder")}
            required
          />
          {messages?.email && (
            <p className="mt-2 text-sm text-red-500">{t(messages?.email)}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-gray-800 font-semibold mb-2"
          >
            <FiMessageCircle className="inline mr-1 text-slate-600" />{" "}
            {t("subject")} <strong className="text-red-500">*</strong>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder={t("subjectPlaceholder")}
            required
          />
          {messages?.subject && (
            <p className="mt-2 text-sm text-red-500">{t(messages?.subject)}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-800 font-semibold mb-2"
          >
            <FiMessageCircle className="inline mr-1 text-slate-600" />{" "}
            {t("message")} <strong className="text-red-500">*</strong>
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder={t("messagePlaceholder")}
            required
          ></textarea>
          {messages?.message && (
            <p className="mt-2 text-sm text-red-500">{t(messages?.message)}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center items-center bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />{" "}
              {t("sending")}
            </>
          ) : (
            t("send")
          )}
        </button>
      </form>
    </section>
  );
};

export default page;
