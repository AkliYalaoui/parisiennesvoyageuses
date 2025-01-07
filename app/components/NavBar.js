"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FaInstagramSquare, FaPinterestSquare } from "react-icons/fa";
import { useState } from "react";
import { usePathname } from "@/i18n/routing";
import Image from "next/image";

// Define available languages with flags
const languages = [
  { code: "en", name: "English" }, // UK flag
  { code: "fr", name: "Français" }, // France flag
  { code: "ko", name: "한국어" }, // South Korea flag
  { code: "zh", name: "中文" }, // China flag
  { code: "de", name: "Deutsch" }, // Germany flag
  { code: "es", name: "Español" }, // Spain flag
  { code: "it", name: "Italiano" }, // Italy flag
  { code: "ja", name: "日本語" }, // Japan flag
  { code: "ar", name: "العربية" }, // Arabic flag
  { code: "pt", name: "Português" }, // Portugal flag
];

const NavBar = ({ locale }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const t = useTranslations("NavBar");
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-orange-950">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between p-4 text-white">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold italic">
            Parisiennes<sub>voyageuses</sub>
          </Link>

          {/* Hamburger Menu */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          {/* Links for Larger Screens */}
          <ul className="hidden md:flex flex-row items-center space-x-6">
            <li className={locale === "ar" ? "ml-6" : ""}>
              <Link href="/">{t("homePage")}</Link>
            </li>
            <li>
              <Link href="/guide">{t("travelPage")}</Link>
            </li>
            <li>
              <Link href="/blog">{t("blogPage")}</Link>
            </li>
            <li>
              <Link href="/about">{t("aboutPage")}</Link>
            </li>
            <li>
              <Link href="/contact">{t("contactPage")}</Link>
            </li>
          </ul>

          {/* Language Selector */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            >
              <Image
                alt={languages.find((lang) => lang.code === locale)?.name}
                src={`/flags/${
                  languages.find((lang) => lang.code === locale)?.code
                }.png`}
                width={30}
                height={30}
                className={locale === "ar" ? "ml-2" : ""}
              />
              <span>
                {languages.find((lang) => lang.code === locale)?.name}
              </span>
            </button>
            {languageMenuOpen && (
              <ul className="absolute bg-white text-black rounded shadow-lg mt-2 w-32">
                {languages.map(({ code, name, flag }) => (
                  <li
                    key={code}
                    className={`p-2 hover:bg-orange-200 ${
                      locale === code ? "font-bold" : "font-normal"
                    }`}
                  >
                    <Link
                      href={pathname}
                      locale={code}
                      className="flex items-center space-x-2"
                      onClick={() => setLanguageMenuOpen(false)}
                    >
                      <Image
                        alt={name}
                        src={`/flags/${code}.png`}
                        width={30}
                        height={30}
                        className={locale === "ar" ? "ml-2" : ""}
                      />
                      <span>{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Social Media Icons */}
          <ul className="hidden md:flex items-center space-x-4">
            <li>
              <Link href="https://instagram.com" target="_blank">
                <FaInstagramSquare size={30} className="text-pink-100" />
              </Link>
            </li>
            <li>
              <Link href="https://pinterest.com" target="_blank">
                <FaPinterestSquare size={30} className="text-red-100" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Full-Screen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-orange-950 z-20 flex flex-col items-center justify-center text-white">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-3xl font-bold"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          {/* Menu Links */}
          <ul className="flex flex-col items-center space-y-6 text-2xl">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                {t("homePage")}
              </Link>
            </li>
            <li>
              <Link href="/guide" onClick={() => setMenuOpen(false)}>
                {t("travelPage")}
              </Link>
            </li>
            <li>
              <Link href="/blog" onClick={() => setMenuOpen(false)}>
                {t("blogPage")}
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                {t("aboutPage")}
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                {t("contactPage")}
              </Link>
            </li>
          </ul>

          {/* Social Media Icons */}
          <ul className="flex items-center space-x-6 mt-8">
            <li>
              <Link
                href="https://instagram.com"
                target="_blank"
                onClick={() => setMenuOpen(false)}
              >
                <FaInstagramSquare size={40} className="text-pink-100" />
              </Link>
            </li>
            <li>
              <Link
                href="https://pinterest.com"
                target="_blank"
                onClick={() => setMenuOpen(false)}
              >
                <FaPinterestSquare size={40} className="text-red-100" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
