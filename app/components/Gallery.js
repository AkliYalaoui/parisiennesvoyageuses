import Image from "next/image";
import { useTranslations } from "next-intl";

const Gallery = () => {
  const t = useTranslations("Gallery");
  return (
    <section className="container mx-auto p-4 mt-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coffee">
        {t("title")}
      </h2>
      <div className="bg-peach grid grid-cols-3 sm:grid-cols-5 gap-2 p-2 my-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15].map((n) => (
          <div key={n}>
            <Image
              src={`/gallery/g${n}.jpeg`}
              alt="best shots"
              className="h-full w-full object-cover rounded-lg shadow-md hover:scale-105"
              height="500"
              width="300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
