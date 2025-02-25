"use client";

import sendEMail from "@/app/lib/sendEMail";
import { useActionState } from "react";
import { FiMail, FiUser, FiMessageCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { Pacifico } from "next/font/google";
import FollowCard from "@/app/components/FollowCard";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

const page = () => {
  const [messages, formAction, isPending] = useActionState(sendEMail, null);
  const t = useTranslations("ContactPage");
  return (
    <section className="px-4 md:pt-20 max-w-5xl mx-auto">
      <h1
        className={`text-center text-coffee text-4xl sm:text-5xl lg:text-6xl font-extrabold  mb-10 ${pacifico.className}`}
      >
        {t("title")}
      </h1>

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-warmbrown">
        {t("followUs")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 my-8">
        <FollowCard
          app="Instagram"
          url="https://www.instagram.com/parisiennesvoyageuses"
          bg="bg-softyellow "
          btntag={t("followIG")}
        />
        <FollowCard
          app="Tik Tok"
          url="https://www.tiktok.com/@parisiennesvoyageuses"
          bg="bg-softblue"
          btntag={t("followIG")}
        />
      </div>

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-warmbrown my-8">
        {t("WriteUs")}
      </h2>
      {messages?.error && (
        <div className=" bg-red-200 border border-red-800 text-slate-950 p-4 rounded-lg mb-6">
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
        className="shadow-lg p-8  rounded-lg border-t-4 border-softpink bg-peach"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-coffee font-semibold mb-2"
          >
            <FiUser className="inline mr-1 text-coffee" /> {t("name")}{" "}
            <strong className="text-red-500">*</strong>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full  px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-coffee"
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
            className="block text-coffee font-semibold mb-2"
          >
            <FiMail className="inline mr-1 text-coffee" /> {t("email")}{" "}
            <strong className="text-red-500">*</strong>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full  px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-coffee"
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
            className="block text-coffee font-semibold mb-2"
          >
            <FiMessageCircle className="inline mr-1 text-coffee" />{" "}
            {t("subject")} <strong className="text-red-500">*</strong>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-coffee"
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
            className="block text-coffee font-semibold mb-2"
          >
            <FiMessageCircle className="inline mr-1 text-coffee" />{" "}
            {t("message")} <strong className="text-red-500">*</strong>
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:coffee"
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
          className=" flex justify-center items-center bg-softpink hover:bg-rose-500 text-peach font-semibold p-2 rounded-md transition-all focus:outline-none focus:ring-1 focus:ring-rose-600 disabled:opacity-50"
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
