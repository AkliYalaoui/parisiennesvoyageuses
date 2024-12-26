import Reel from "./Reel";

const fetchReels = async () => {
  const { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID, INSTAGRAM_USER_NAME } =
    process.env;
  const url = `https://graph.facebook.com/v21.0/${INSTAGRAM_USER_ID}?fields=business_discovery.username(${INSTAGRAM_USER_NAME}){followers_count,media_count,media{id,caption,like_count,comments_count,timestamp,username,media_product_type,media_type,media_url}}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching Reels:", error);
  }
};

const LatestReels = async () => {
  const reels = await fetchReels();
  return (
    <section className="container mx-auto p-4 py-16">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-950 text-center">
        Watch our latest reels
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {[1, 2, 3, 4].map((n) => (
          <Reel key={n} src={`/reels/r${n}.mp4`} />
        ))}
      </div>
    </section>
  );
};

export default LatestReels;
