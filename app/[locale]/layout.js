import { Playfair_Display } from "next/font/google";
import "../globals.css";
import Footer from "@/app/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: {
    template: "Parisiennes Voyageuses | %s",
    default: "Parisiennes Voyageuses | Official Home Page",
  },
  description: "Parisiennes Voyageuses Official Website",
  keywords: "Instagram, Traveling, Voyage, Reels, Paris, Twins",
};

export default async function RootLayout({ children, params }) {
  const locale = (await params).locale;
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  const direction = locale === "ar" ? "rtl" : "ltr";
  const messages = await getMessages();
  return (
    <html lang={locale} dir={direction}>
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-21FTFZFSKJ"
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-21FTFZFSKJ');
          `}
        </script>
      </head>
      <body className={`${playfair.className}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Footer />
      </body>
    </html>
  );
}
