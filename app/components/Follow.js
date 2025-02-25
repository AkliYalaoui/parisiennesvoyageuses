import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FiCamera, FiHeart } from "react-icons/fi";

const Follow = () => {
  const t = useTranslations("Follow");
  return (
    <section className="py-12">
    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coffee mb-4">
        {t('title')}
      </h2>
      <p className=" text-warmbrown mb-10">
      {t('subTitle')}
      </p>

      {/* Icon Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
        <div className="p-3 bg-softblue rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FiCamera className="text-4xl text-warmbrown mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-coffee">{t('firsCardTitle')}</h3>
          <p className="text-warmbrown">
          {t('firstCardDesc')}
          </p>
        </div>
        <div className="p-3 bg-softblue rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FiHeart className="text-4xl text-warmbrown mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-coffee">{t('secondCardTitle')}</h3>
          <p className="text-warmbrown">
          {t('secondCardDesc')}
          </p>
        </div>
        <div className="p-3 bg-softblue rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FaInstagram className="text-4xl text-warmbrown mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-coffee">{t('thirdCardTitle')}</h3>
          <p className="text-warmbrown">
          {t('thirdCardDesc')}
          </p>
        </div>
      </div>

      {/* Call-to-Action */}
      <div>
        <Link
          href="https://www.instagram.com/parisiennesvoyageuses"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center p-2 bg-coffee text-peach rounded-lg shadow-lg hover:bg-warmbrown transition-all duration-300"
        >
          <FaInstagram className="mr-3 text-xl" />
          {t('button')}
        </Link>
        <p className="mt-2 text-sm text-coffee">
            {t('note')}
          </p>
      </div>
    </div>
  </section>
  )
}

export default Follow