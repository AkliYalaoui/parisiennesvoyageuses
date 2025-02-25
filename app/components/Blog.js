import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const Blog = () => {
  const t = useTranslations("Blog");
  return (
    <section className="bg-peach py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <Image
              src="/b.jpg"
              alt="Travel Blog"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              height="500"
              width="500"
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-coffee mb-4">
              {t('title')}
            </h2>
            <p className=" text-warmbrown mb-6">
              {t('desc')}
            </p>
            <Link
              href="/blog"
              className="p-2 bg-coffee text-peach rounded-lg shadow-lg hover:bg-warmbrown transition-all duration-300"
            >
              {t('button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
