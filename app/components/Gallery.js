import Image from "next/image";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

const Gallery = () => {
  const t = useTranslations("Gallery");

  return (
    <section className="container mx-auto max-w-5xl p-4">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coffee">
        {t("title")}
      </h2>
      <div className="bg-peach grid grid-cols-3 sm:grid-cols-5 gap-2 p-2 my-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n, index) => (
          <motion.div
            key={n}
            variants={{
              hidden: { opacity: 0, x: -50, rotate: -3 },
              visible: {
                opacity: 1,
                x: 0,
                rotate: 0,
                transition: { duration: 1, ease: "easeOut" },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src={`/gallery/g${n}.jpeg`}
              alt="best shots"
              className="h-full w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out hover:rotate-3"
              height="500"
              width="300"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
