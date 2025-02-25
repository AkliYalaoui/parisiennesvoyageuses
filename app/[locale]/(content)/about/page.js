import Image from "next/image";
import { FaInstagramSquare } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

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
    <section className=" md:pt-20">
      <div className="container mx-auto px-6 md:px-12">
        {/* Introduction */}
        <h1
          className={` text-coffee text-4xl sm:text-5xl lg:text-6xl font-extrabold  mb-14 ${pacifico.className}`}
        >
          {t("title")}
        </h1>

        {/* Our Story */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-warmbrown mb-4">
              {t("meet")}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{t("p1")}</p>
            <p className="text-lg text-gray-700 mb-4">{t("p2")}</p>
            <p className="text-lg text-gray-700 mb-4">{t("p3")}</p>
            <Link
              href="https://www.instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center p-2 bg-rose-500 text-peach rounded-lg hover:bg-softpink transition-all duration-300"
            >
              <FaInstagramSquare className="mr-3 text-xl" />
              {t("cta2")}
            </Link>
          </div>

          {/* Photo of Twins */}
          <div className="flex-1">
            <Image
              src="/twins.png"
              alt="Twin Sisters"
              width={400}
              height={400}
              className="rounded-lg shadow"
            />
          </div>
        </div>

        {/* Our Travel Adventures */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-warmbrown mb-8">
            {t("title2")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((adventure) => (
              <div
                key={adventure.city}
                className="bg-peach rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={`/travel/${adventure.city.replace(" ", "")}.jpg`}
                  alt={adventure.city}
                  width={400}
                  height={250}
                  className="object-cover w-full h-64"
                />
                <div className="p-6">
                  <h3 className="text-xl text-center font-semibold text-coffee mb-2">
                    {adventure.title}
                  </h3>
                  <p className="text-warmbrown">{adventure.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why We Started */}
        <div className="mt-16 bg-softblue p-4">
          <h2 className="text-2xl font-semibold text-coffee text-center mb-8">
            {t("title3")}
          </h2>
          <p className="text-lg text-warmbrown text-center max-w-4xl mx-auto">
            {t("p4")}
          </p>
          <p className="text-lg text-warmbrown text-center mt-4 max-w-4xl mx-auto">
            {t("p5")}
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <Link
            href="/guide"
            className="p-2 bg-coffee text-peach font-semibold rounded-lg hover:bg-warmbrown transition"
          >
            {t("cta2")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
