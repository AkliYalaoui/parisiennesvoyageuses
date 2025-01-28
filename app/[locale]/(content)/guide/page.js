import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const metadata = {
  title: "Travel Guides",
};

const TravelGuides = () => {
  const t = useTranslations("GuidesPage");

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Introduction */}
      <div className="flex flex-wrap items-center justify-center flex-row gap-8 mb-12 text-center max-w-6xl mx-auto">
        <div className="">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-950">
            {t("introTitle")}
          </h1>
          <p className="text-lg text-gray-600 mt-4">{t("introDescription")}</p>
          <p className="text-md text-gray-600 mt-2 italic">{t("introQuote")}</p>
        </div>
        <Image src="/paris.svg" alt="eiffel tower" height="230" width="230" />
      </div>

      {/* Guide Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Essential Paris Guide */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-orange-950 mb-4">
            {t("guideCards.essentialParis.title")}
          </h2>
          <p className="text-gray-700 mb-4">
            {t("guideCards.essentialParis.description")}
          </p>
          <p className="text-lg font-bold text-gray-800 mb-4">
            {t("guideCards.essentialParis.price")}
          </p>
          <div className="flex justify-between items-center">
            <a
              href="#essential"
              className="block text-center bg-orange-950 text-white py-2 px-4 rounded-lg hover:bg-orange-800 transition"
            >
              {t("guideCards.essentialParis.learnMore")}
            </a>
            <Link
              href="/guide/essential-paris-guide"
              className="bg-amber-200 text-amber-950 py-2 px-4 rounded-lg hover:bg-amber-100 transition"
            >
              {t("guideCards.essentialParis.buyNow")}
            </Link>
          </div>
        </div>

        {/* Hidden Paris Guide */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-orange-950 mb-4">
            {t("guideCards.hiddenParis.title")}
          </h2>
          <p className="text-gray-700 mb-4">
            {t("guideCards.hiddenParis.description")}
          </p>
          <p className="text-lg font-bold text-gray-800 mb-4">
            {t("guideCards.hiddenParis.price")}
          </p>
          <div className="flex justify-between items-center">
            <a
              href="#hidden"
              className="block text-center bg-orange-950 text-white py-2 px-4 rounded-lg hover:bg-orange-800 transition"
            >
              {t("guideCards.hiddenParis.learnMore")}
            </a>
            <Link
              href="/guide/hidden-paris-guide"
              className="bg-amber-200 text-amber-950 py-2 px-4 rounded-lg hover:bg-amber-100 transition"
            >
              {t("guideCards.hiddenParis.buyNow")}
            </Link>
          </div>
        </div>

        {/* Luxury Paris Guide */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-orange-950 mb-4">
            {t("guideCards.luxuryParis.title")}
          </h2>
          <p className="text-gray-700 mb-4">
            {t("guideCards.luxuryParis.description")}
          </p>
          <p className="text-lg font-bold text-gray-800 mb-4">
            {t("guideCards.luxuryParis.price")}
          </p>
          <div className="flex justify-between items-center">
            <a
              href="#luxury"
              className="block text-center bg-orange-950 text-white py-2 px-4 rounded-lg hover:bg-orange-800 transition"
            >
              {t("guideCards.luxuryParis.learnMore")}
            </a>
            <Link
              href="/guide/luxury-paris-guide"
              className="bg-amber-200 text-amber-950 py-2 px-4 rounded-lg hover:bg-amber-100 transition"
            >
              {t("guideCards.luxuryParis.buyNow")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-3xl font-semibold text-orange-950">
          {t("whyChoose.title")}
        </h3>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          {t("whyChoose.description")}
        </p>
        <ul className="list-disc list-inside mt-4 max-w-xl mx-auto text-gray-700">
          <li>{t("whyChoose.benefits.first")}</li>
          <li>{t("whyChoose.benefits.second")}</li>
          <li>{t("whyChoose.benefits.third")}</li>
        </ul>
        <p className="text-lg text-gray-600 mt-6">
          {t("whyChoose.closingText")}
        </p>
      </div>

      {/* Guide Details Sections */}
      <div id="essential" className="mt-12 pt-12 border-t border-gray-300">
        <h2 className="text-3xl font-bold text-orange-950">
          {t("guideDetails.essential.title")}
        </h2>
        <p className="text-gray-600 mt-4">
          {t("guideDetails.essential.description")}
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          <li>{t("guideDetails.essential.list.first")}</li>
          <li>{t("guideDetails.essential.list.second")}</li>
          <li>{t("guideDetails.essential.list.third")}</li>
        </ul>
      </div>

      <div id="hidden" className="mt-12 pt-12 border-t border-gray-300">
        <h2 className="text-3xl font-bold text-orange-950">
          {t("guideDetails.hidden.title")}
        </h2>
        <p className="text-gray-600 mt-4">
          {t("guideDetails.hidden.description")}
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          <li>{t("guideDetails.hidden.list.first")}</li>
          <li>{t("guideDetails.hidden.list.second")}</li>
          <li>{t("guideDetails.hidden.list.third")}</li>
        </ul>
      </div>

      <div id="luxury" className="mt-12 pt-12 border-t border-gray-300">
        <h2 className="text-3xl font-bold text-orange-950">
          {t("guideDetails.luxury.title")}
        </h2>
        <p className="text-gray-600 mt-4">
          {t("guideDetails.luxury.description")}
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          <li>{t("guideDetails.luxury.list.first")}</li>
          <li>{t("guideDetails.luxury.list.second")}</li>
          <li>{t("guideDetails.luxury.list.third")}</li>
        </ul>
      </div>
    </section>
  );
};

export default TravelGuides;
