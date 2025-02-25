import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Pacifico } from "next/font/google";
import * as motion from "motion/react-client";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Travel Guides",
};

const TravelGuides = () => {
  const t = useTranslations("GuidesPage");

  // Fancy Slide & Scale Animation
  const cardAnimation = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 1 * 0.15, duration: 0.8, ease: "easeOut" },
    },
  };

  // Elegant Section Slide-In
  const sectionAnimation = {
    hidden: { opacity: 0, x: -50, rotate: -3 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div>
      {/* Introduction */}
      <div className="bg-peach -mt-10 md:mt-0 py-4 md:py-8 flex flex-col items-center justify-center gap-4 text-center">
        <Image
          src="/paris.svg"
          alt="eiffel tower"
          height="150"
          width="150"
          className="hidden md:block"
        />
        <div className="max-w-2xl mt-2 px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-coffee font-bold max-w-4xl leading-tight">
            {t("introTitle")}
          </h1>
          <p className="text-sm text-warmbrown mt-2 italic">
            {t("introQuote")}
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-5xl mt-8 p-4">
        {/* Guide Overview Cards with Staggered Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["essentialParis", "hiddenParis", "luxuryParis"].map(
            (guide, index) => (
              <motion.div
                key={guide}
                custom={index}
                variants={cardAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-softyellow rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center"
              >
                <h2
                  className={`text-2xl font-semibold text-coffee mb-4 ${pacifico.className}`}
                >
                  {t(`guideCards.${guide}.title`)}
                </h2>
                <p className="text-warmbrown mb-4">
                  {t(`guideCards.${guide}.description`)}
                </p>
                <p className="text-lg font-bold text-coffee mb-4">
                  {t(`guideCards.${guide}.price`)}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href={`#${guide}`}
                    className="block underline text-center text-pink-500"
                  >
                    {t(`guideCards.${guide}.learnMore`)}
                  </a>
                  <Link
                    href={`/guide/${guide}`}
                    className="bg-softpink text-peach p-2 rounded-lg hover:bg-pink-500 transition"
                  >
                    {t(`guideCards.${guide}.buyNow`)}
                  </Link>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Animated Guide Details Sections with Slide-In Effect */}
        {["essential", "hidden", "luxury"].map((section) => (
          <motion.div
            key={section}
            id={section}
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`mt-12 p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8 ${
              section === "essential"
                ? "bg-softblue"
                : section === "hidden"
                ? "bg-peach"
                : "bg-softyellow"
            }`}
          >
            {section !== "luxury" && (
              <Image
                src="/paris.svg"
                alt={`${section} guide`}
                height="300"
                width="300"
                className="w-64 h-auto hidden md:block rounded-lg shadow-md"
              />
            )}
            <div className="max-w-lg text-center md:text-left">
              <h2
                className={`text-4xl font-bold text-coffee ${pacifico.className}`}
              >
                {t(`guideDetails.${section}.title`)}
              </h2>
              <p className="text-warmbrown mt-4 leading-relaxed">
                {t(`guideDetails.${section}.description`)}
              </p>
              <ul className="list-disc list-inside mt-4 text-warmbrown space-y-2">
                <li>{t(`guideDetails.${section}.list.first`)}</li>
                <li>{t(`guideDetails.${section}.list.second`)}</li>
                <li>{t(`guideDetails.${section}.list.third`)}</li>
              </ul>
            </div>
            {section === "luxury" && (
              <Image
                src="/paris.svg"
                alt="Luxury Experience"
                height="300"
                width="300"
                className="w-64 h-auto hidden md:block rounded-lg shadow-md border-2 border-gold"
              />
            )}
          </motion.div>
        ))}

        {/* Elegant Fade-In for Why Choose Us */}
        <motion.div
          variants={sectionAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center pt-12 border-t border-gray-300"
        >
          <h3 className="text-3xl font-semibold text-coffee">
            {t("whyChoose.title")}
          </h3>
          <p className="text-lg text-coffee mt-4 max-w-3xl mx-auto">
            {t("whyChoose.description")}
          </p>
          <ul className="list-disc list-inside mt-4 max-w-xl mx-auto text-warmbrown">
            <li>{t("whyChoose.benefits.first")}</li>
            <li>{t("whyChoose.benefits.second")}</li>
            <li>{t("whyChoose.benefits.third")}</li>
          </ul>
          <p className="text-lg text-warmbrown mt-6">
            {t("whyChoose.closingText")}
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default TravelGuides;
