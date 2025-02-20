import Reel from "./Reel";
import { getTranslations } from "next-intl/server";

const fetchReels = async (instagramUserId, accessToken) => {
  const url = `https://graph.facebook.com/v22.0/${instagramUserId}/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp&access_token=${accessToken}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data.filter((item) => item.media_type === "VIDEO"); // Filter for Reels (videos)
};

const LatestReels = async () => {
  const t = await getTranslations("LatestReels");
  const reels = ["DFV6KXGoRm4", "DFMsR5XIFW0", "DEX-lSJobIV", "DCzs-nQR7qC"];

  return (
    <section className="container mx-auto p-4 py-16">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 text-center">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 my-8">
        {reels.map((id) => (
          <Reel key={id} id={id} />
        ))}
      </div>
    </section>
  );
};

export default LatestReels;
