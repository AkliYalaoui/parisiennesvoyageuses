import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <section className="bg-peach pt-20 md:pt-40 pb-10">
      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-coffee font-bold max-w-4xl leading-tight">
          {t("headline")}
        </h1>
        <h4 className="text-sm sm:text-base lg:text-lg text-warmbrown max-w-xl mt-4">
          {t("subHeadline")}
        </h4>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <Link
            href="https://www.instagram.com/parisiennesvoyageuses"
            target="_blank"
            className="rounded-md p-2 bg-softpink text-peach text-center"
          >
            {t("followUs")}
          </Link>
          <Link
            href="/guide"
            className="rounded-md p-2 border  text-peach bg-warmbrown text-center"
          >
            {t("shopGuide")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
