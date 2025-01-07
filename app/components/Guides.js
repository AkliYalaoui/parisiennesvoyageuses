import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { FaMapSigns } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const Guides = () => {
  const t = useTranslations("Guides")
  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange-900 mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-700">
            {t('subTitle')}
          </p>
        </div>

        {/* Icon Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <IoFastFoodOutline className="text-6xl text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">{t('firsCardTitle')}</h3>
            <p className="text-gray-600">
              {t('firstCardDesc')}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <MdOutlinePlace className="text-6xl text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              {t('secondCardTitle')}
            </h3>
            <p className="text-gray-600">
              {t('secondCardDesc')}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <FaMapSigns className="text-6xl text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              {t('thirdCardTitle')}
            </h3>
            <p className="text-gray-600">
              {t('thirdCardDesc')}
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link
            href="/guide"
            className="px-8 py-4 bg-orange-700 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-orange-900 transition-all duration-300"
          >
            {t('button')}
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Guides;
