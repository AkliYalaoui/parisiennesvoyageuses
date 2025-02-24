import Reel from "./Reel";
import { getTranslations } from "next-intl/server";


const LatestReels = async () => {
  const t = await getTranslations("LatestReels");
  const reels = ["DFV6KXGoRm4", "DFMsR5XIFW0", "DEX-lSJobIV"];

  return (
    <section className="container mx-auto p-4 mt-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coffee">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-8">
        {reels.map((id) => (
          <Reel key={id} id={id} />
        ))}
      </div>
    </section>
  );
};

export default LatestReels;
