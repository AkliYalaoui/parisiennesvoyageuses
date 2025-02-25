"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { usePathname } from "@/i18n/routing";
import Image from "next/image";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

// Define available languages with flags
const languages = [
  { code: "en", name: "English" }, // UK flag
  { code: "fr", name: "Français" }, // France flag
  { code: "ko", name: "한국어" }, // South Korea flag
  { code: "ja", name: "日本語" }, // Japan flag
];

const NavBar = ({ locale }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const t = useTranslations("NavBar");
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-peach">
      <div className="container max-w-6xl mx-auto px-4">
        <header className="flex items-center justify-between p-4 text-coffee">
          {/* Logo */}
          <Link
            href="https://www.instagram.com/parisiennesvoyageuses"
            target="_blank"
          >
            <div className="flex items-center gap-1">
              <Image
                alt="IG profile image"
                src="/ig/profile.jpg"
                width={45}
                height={45}
                className="rounded-full p-0.5 border-2 border-rose-400"
              />
              <div className="flex flex-col items-start text-xs md:text-sm">
                <span className={`text-coffee font-bold `}>
                  @parisiennesvoyageuses
                </span>
                <span className="italic">Parisian lifestyle & travel</span>
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className={`hidden md:block text-coffee text-2xl font-bold ${pacifico.className}`}
          >
            Parisiennes Voyageuses
          </Link>

          {/* Hamburger Menu */}
          <button
            className="md:hidden text-coffee focus:outline-none"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
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
              <span className="hidden md:inline">
                {languages.find((lang) => lang.code === locale)?.name}
              </span>
            </button>
            {languageMenuOpen && (
              <ul className="absolute right-0 bg-white text-black rounded shadow-lg mt-2 w-32">
                {languages.map(({ code, name, flag }) => (
                  <li
                    key={code}
                    className={`p-2 hover:bg-rose-100 ${
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
                      <span className="text-coffee">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        <nav className="flex items-center justify-between p-4 text-coffee">
          {/* Links for Larger Screens */}
          <ul className="hidden md:flex flex-row items-center justify-center space-x-6 text-warmbrown font-bold w-full mt-6">
            <li>
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
        </nav>
      </div>

      {/* Full-Screen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-peach z-20 flex flex-col items-center justify-center text-warmbrown font-bold">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-3xl font-bold"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          {/* Menu Links */}
          <ul className="flex flex-col items-center space-y-6 text-2xl ">
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
        </div>
      )}
    </div>
  );
};

export default NavBar;
