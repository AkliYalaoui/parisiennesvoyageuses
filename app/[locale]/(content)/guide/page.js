import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Travel Guides',
};

const TravelGuides = () => {
  return (
    <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Introduction */}
      <div className="flex flex-wrap  items-center justify-center flex-row gap-8 mb-12 text-center max-w-6xl mx-auto">
        <div className="">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-950">
            Explore Our Paris Travel Guides
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Discover Paris like never before with our expertly crafted travel
            guides. Each guide is designed to cater to a unique travel style,
            ensuring a memorable and stress-free experience.
          </p>
          <p className="text-md text-gray-600 mt-2 italic">
            "Whether you're a first-time visitor, a seasoned explorer, or
            someone seeking luxury, we have something special just for you!"
          </p>
        </div>
        <Image src="/paris.svg" alt="eiffel tower" height="230" width="230" />
      </div>

      {/* Guide Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Essential Paris Guide */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-orange-950 mb-4">
            Essential Paris
          </h2>
          <p className="text-gray-700 mb-4">
            Perfect for first-time visitors. Includes must-see attractions, tips
            on transportation, and sample itineraries.
          </p>
          <p className="text-lg font-bold text-gray-800 mb-4">Price: €19.99</p>
          <div className="flex justify-between items-center">
            <a
              href="#essential"
              className="block text-center bg-orange-950 text-white py-2 px-4 rounded-lg hover:bg-orange-800 transition"
            >
              Learn More
            </a>
            <Link
              href="/content/buy/essential-paris-guide"
              className="bg-amber-200 text-amber-950 py-2 px-4 rounded-lg hover:bg-amber-100 transition"
            >
              Buy Now
            </Link>
          </div>
        </div>

        {/* Hidden Paris Guide */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-orange-950 mb-4">
            Hidden Paris
          </h2>
          <p className="text-gray-700 mb-4">
            For those seeking unique experiences. Explore hidden gems, local
            cafes, and off-the-beaten-path neighborhoods.
          </p>
          <p className="text-lg font-bold text-gray-800 mb-4">Price: €24.99</p>
          <div className="flex justify-between items-center">
            <a
              href="#hidden"
              className="block text-center bg-orange-950 text-white py-2 px-4 rounded-lg hover:bg-orange-800 transition"
            >
              Learn More
            </a>
            <Link
              href="/content/buy/hidden-paris-guide"
              className="bg-amber-200 text-amber-950 py-2 px-4 rounded-lg hover:bg-amber-100 transition"
            >
              Buy Now
            </Link>
          </div>
        </div>

        {/* Luxury Paris Guide */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-orange-950 mb-4">
            Luxury Paris
          </h2>
          <p className="text-gray-700 mb-4">
            Indulge in the finest Paris has to offer. Includes luxury dining,
            shopping, and exclusive experiences.
          </p>
          <p className="text-lg font-bold text-gray-800 mb-4">Price: €39.99</p>
          <div className="flex justify-between items-center">
            <a
              href="#luxury"
              className="block text-center bg-orange-950 text-white py-2 px-4 rounded-lg hover:bg-orange-800 transition"
            >
              Learn More
            </a>
            <Link
              href="/content/buy/luxury-paris-guide"
              className="bg-amber-200 text-amber-950 py-2 px-4 rounded-lg hover:bg-amber-100 transition"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-3xl font-semibold text-orange-950">
          Why Choose Our Guides?
        </h3>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Each guide is written by seasoned travelers who know Paris inside-out.
          We provide:
        </p>
        <ul className="list-disc list-inside mt-4 max-w-xl mx-auto text-gray-700">
          <li>Insider tips to save time and money.</li>
          <li>Exclusive recommendations you won't find elsewhere.</li>
          <li>Engaging and easy-to-follow itineraries.</li>
        </ul>
        <p className="text-lg text-gray-600 mt-6">
          Don't just visit Paris—experience it like never before.
        </p>
      </div>

      {/* Guide Details Sections */}
      <div id="essential" className="mt-12 pt-12 border-t border-gray-300">
        <h2 className="text-3xl font-bold text-orange-950">
          Essential Paris Guide
        </h2>
        <p className="text-gray-600 mt-4">
          Whether it's your first time in Paris or you're revisiting the
          classics, this guide covers the Eiffel Tower, Notre Dame, Montmartre,
          and more. We also include tips on public transportation and the best
          times to visit iconic landmarks.
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          <li>Step-by-step itineraries for 1-3 days</li>
          <li>Hidden tips to avoid crowds</li>
          <li>Affordable recommendations for food and transport</li>
        </ul>
      </div>

      <div id="hidden" className="mt-12 pt-12 border-t border-gray-300">
        <h2 className="text-3xl font-bold text-orange-950">
          Hidden Paris Guide
        </h2>
        <p className="text-gray-600 mt-4">
          Discover the Paris that locals love. This guide will take you to
          secret gardens, vibrant street art scenes, lesser-known cafes, and
          authentic neighborhoods.
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          <li>Instagram-worthy photo spots</li>
          <li>Unique walking tours of hidden gems</li>
          <li>Where to experience Parisian culture without tourists</li>
        </ul>
      </div>

      <div id="luxury" className="mt-12 pt-12 border-t border-gray-300">
        <h2 className="text-3xl font-bold text-orange-950">
          Luxury Paris Guide
        </h2>
        <p className="text-gray-600 mt-4">
          Experience Paris in style. From world-class shopping on Avenue des
          Champs-Élysées to dining at Michelin-starred restaurants, this guide
          ensures a luxurious journey through the City of Light.
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          <li>Exclusive hotel and spa recommendations</li>
          <li>Top fine-dining restaurants</li>
          <li>Private tours of museums and landmarks</li>
        </ul>
      </div>
    </section>
  );
};

export default TravelGuides;
