import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FaInstagram, FaTwitter, FaEnvelope, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-softyellow text-coffee py-12">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('title')}</h3>
            <p className="text-sm text-warmbrown">
              {t('subTitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('quick')}</h3>
            <ul className="space-y-2 text-sm text-warmbrown">
              <li>
                <Link href="/guide" className="hover:text-coffee">
                  {t('travel')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-600">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-coffee">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-coffee">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('contactTitle')}</h3>
            <p className="text-sm text-warmbrown">{t('question')}</p>
            <ul className="space-y-2 text-sm text-warmbrown">
              <li>
                <Link href="mailto:info@parisiennesvoyageuses.com" className="hover:text-warmbrown">
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
                href="https://www.instagram.com/parisiennesvoyageuses"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warmbrown hover:text-softpink"
              >
                <FaInstagram className="inline-block mr-2" /> @parisiennesvoyageuses
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center text-sm text-coffee">
          <p>&copy; {new Date().getFullYear()} Parisiennes Voyageuses. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
