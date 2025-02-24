import Blog from "../components/Blog";
import Follow from "../components/Follow";
import Gallery from "../components/Gallery";
import Guides from "../components/Guides";
import Hero from "../components/Hero";
import LatestReels from "../components/LatestReels";
import NavBar from "../components/NavBar";

const HomePage = async  ({params}) => {
  const locale = (await params).locale;
  return (
    <>
      <div className="relative">
        <NavBar locale={locale} />
        <Hero/>
      </div>
      <main>
        <LatestReels />
        <Gallery/>
        <Guides/>
        <Blog/>
        <Follow/>
      </main>
    </>
  );
};

export default HomePage;
