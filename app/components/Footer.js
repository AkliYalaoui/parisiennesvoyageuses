import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FaInstagram, FaTwitter, FaEnvelope, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('title')}</h3>
            <p className="text-sm text-gray-400">
              {t('subTitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('quick')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/guide" className="hover:text-orange-600">
                  {t('travel')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-600">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-600">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-600">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('contactTitle')}</h3>
            <p className="text-sm text-gray-400">{t('question')}</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="mailto:info@parisiennesvoyageuses.com" className="hover:text-orange-600">
                  <FaEnvelope className="inline-block mr-2" /> info@parisiennesvoyageuses.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('follow')}</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 text-xl"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 text-xl"
              >
                <FaPinterestP />
              </Link>
              <Link
                href="https://www.twitter.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 text-xl"
              >
                <FaTwitter />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Parisiennes Voyageuses. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
