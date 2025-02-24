import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { FaMapSigns } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const Guides = () => {
  const t = useTranslations("Guides")
  return (
    <section className="py-12 bg-softblue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coffee mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-coffee">
            {t('subTitle')}
          </p>
        </div>

        {/* Icon Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-peach rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <IoFastFoodOutline className="text-6xl text-softpink mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-coffee">{t('firsCardTitle')}</h3>
            <p className="text-warmbrown">
              {t('firstCardDesc')}
            </p>
          </div>
          <div className="p-6 bg-peach rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <MdOutlinePlace className="text-6xl text-softpink mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-coffee">
              {t('secondCardTitle')}
            </h3>
            <p className="text-warmbrown">
              {t('secondCardDesc')}
            </p>
          </div>
          <div className="p-6 bg-peach rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <FaMapSigns className="text-6xl text-softpink mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-coffee">
              {t('thirdCardTitle')}
            </h3>
            <p className="text-warmbrown">
              {t('thirdCardDesc')}
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link
            href="/guide"
            className="p-2 bg-softpink text-peach font-bold text-lg rounded-lg shadow-lg hover:bg-pink-300 transition-all duration-300"
          >
            {t('button')}
          </Link>
          <p className="mt-4 text-sm text-coffee">
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Guides;
