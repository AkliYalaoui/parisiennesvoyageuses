import Image from "next/image";
import { FaInstagramSquare } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export const metadata = {
  title: "About",
};

const AboutPage = () => {
  const t = useTranslations("AboutPage");

  const adventures = [
    {
      city: "paris",
      title: t("adventures.paris.title"),
      description: t("adventures.paris.description"),
    },
    {
      city: "marseille",
      title: t("adventures.marseille.title"),
      description: t("adventures.marseille.description"),
    },
    {
      city: "strasbourg",
      title: t("adventures.strasbourg.title"),
      description: t("adventures.strasbourg.description"),
    },
    {
      city: "normandy",
      title: t("adventures.normandy.title"),
      description: t("adventures.normandy.description"),
    },
    {
      city: "london",
      title: t("adventures.london.title"),
      description: t("adventures.london.description"),
    },
    {
      city: "milan",
      title: t("adventures.milan.title"),
      description: t("adventures.milan.description"),
    },
    {
      city: "rome",
      title: t("adventures.rome.title"),
      description: t("adventures.rome.description"),
    },
    {
      city: "new york",
      title: t("adventures.newyork.title"),
      description: t("adventures.newyork.description"),
    },
    {
      city: "Istanbul",
      title: t("adventures.istanbul.title"),
      description: t("adventures.istanbul.description"),
    },
    {
      city: "dubai",
      title: t("adventures.dubai.title"),
      description: t("adventures.dubai.description"),
    },
    {
      city: "brussels",
      title: t("adventures.brussels.title"),
      description: t("adventures.brussels.description"),
    },
    {
      city: "abu dhabi",
      title: t("adventures.abudhabi.title"),
      description: t("adventures.abudhabi.description"),
    },
  ];

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-950">{t("title")}</h1>
          <p className="text-lg text-gray-600 mt-4">{t("subTitle")}</p>
        </div>

        {/* Our Story */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-slate-950 mb-4">
              {t("meet")}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{t("p1")}</p>
            <p className="text-lg text-gray-700 mb-4">{t("p2")}</p>
            <p className="text-lg text-gray-700 mb-4">{t("p3")}</p>
            <Link
              href="https://www.instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center p-2 bg-slate-900 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-slate-950 transition-all duration-300"
            >
              <FaInstagramSquare className="mr-3 text-2xl" />
              {t("cta2")}
            </Link>
          </div>

          {/* Photo of Twins */}
          <div className="flex-1">
            <Image
              src="/twins.png"
              alt="Twin Sisters"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Our Travel Adventures */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-slate-950 text-center mb-8">
            {t("title2")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((adventure) => (
              <div
                key={adventure.city}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={`/travel/${adventure.city.replace(" ", "")}.jpg`}
                  alt={adventure.city}
                  width={400}
                  height={250}
                  className="object-cover w-full h-64"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-950 mb-2">
                    {adventure.title}
                  </h3>
                  <p className="text-gray-700">{adventure.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why We Started */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-slate-950 text-center mb-8">
            {t("title3")}
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
            {t("p4")}
          </p>
          <p className="text-lg text-gray-700 text-center mt-4 max-w-4xl mx-auto">
            {t("p5")}
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <Link
            href="/guide"
            className="p-2 bg-slate-950 text-white font-semibold rounded-lg hover:bg-slate-900 transition"
          >
            {t("cta2")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
