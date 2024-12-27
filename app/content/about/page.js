import Image from "next/image";
import { FaInstagramSquare } from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: 'About',
};

const AboutPage = () => {
  const adventures = [
    {
      city: "paris",
      title: "Paris - Our Heart",
      description:
        "Paris is more than just a city for us. It's our home, our inspiration, and our love. We know every corner of this beautiful city and want to share it with you!",
    },
    {
      city: "marseille",
      title: "Marseille - Mediterranean Charm",
      description:
        "Marseille is a city full of life, with its stunning coastline, historic ports, and vibrant culture. The Mediterranean energy of this city makes it one of our favorite places to visit, where the sea and city life blend perfectly.",
    },
    {
      city: "strasbourg",
      title: "Strasbourg - Where Cultures Meet",
      description:
        "Strasbourg, a beautiful city on the French-German border, is known for its mix of French and German culture. The picturesque streets of La Petite France and the grand Strasbourg Cathedral make this city an unforgettable destination.",
    },
    {
      city: "normandy",
      title: "Normandy - History and Nature",
      description:
        "Normandy is known for its rich history, particularly the D-Day landing beaches, as well as its breathtaking natural landscapes. The peaceful countryside, charming villages, and delicious cuisine make it a perfect getaway.",
    },
    {
      city: "london",
      title: "London - A Cultural Hub",
      description:
        "London never fails to impress with its iconic landmarks, vibrant arts scene, and historic charm. From the Tower of London to the bustling West End, this city is always brimming with life and excitement.",
    },
    {
      city: "milan",
      title: "Milan - Fashion and Elegance",
      description:
        "Milan is Italy's fashion capital, and it's also a city of art, history, and culture. The stunning Duomo Cathedral, incredible shopping, and exquisite food make Milan a destination that's both stylish and rich in heritage.",
    },
    {
      city: "rome",
      title: "Rome - The Eternal City",
      description:
        "Rome is a city like no other, steeped in history and ancient architecture. The Colosseum, the Roman Forum, and the Vatican are just a few of the iconic sites that make this city unforgettable.",
    },
    {
      city: "new york",
      title: "New York - The City That Never Sleeps",
      description:
        "New York is a bustling metropolis that offers endless things to see and do. From Times Square to Central Park and the vibrant neighborhoods, this city never fails to inspire with its energy and diversity.",
    },
    {
      city: "Istanbul",
      title: "Istanbul - Where East Meets West",
      description:
        "Istanbul is a city that blends the best of Europe and Asia, offering a unique mix of cultures, history, and architecture. The Hagia Sophia and Bosphorus views are just the beginning of this magical city.",
    },
    {
      city: "dubai",
      title: "Dubai - Luxury and Innovation",
      description:
        "Dubai is a futuristic city of luxury, towering skyscrapers, and incredible shopping. Known for its opulence, Dubai also offers rich cultural experiences and breathtaking desert landscapes.",
    },
    {
      city: "brussels",
      title: "Brussels - A Blend of Cultures",
      description:
        "Brussels, the heart of Europe, is a city known for its unique blend of French and Flemish cultures. With stunning architecture, delicious chocolate, and the iconic Atomium, Brussels offers something for every traveler.",
    },
    {
      city: "Abu dhabi",
      title: "Abu Dhabi - Oasis of Luxury and Culture",
      description: "Abu Dhabi, the capital of the UAE, blends modern architecture with rich cultural heritage. From the Sheikh Zayed Grand Mosque to the Louvre Abu Dhabi and exhilarating desert adventures, this city offers a captivating experience."
    },
  ];

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-950">About Us</h1>
          <p className="text-lg text-gray-600 mt-4">
            Twin sisters, adventurers at heart. We are here to share the magic
            of Paris and our journeys around the world.
          </p>
        </div>

        {/* Our Story */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-orange-950 mb-4">
              Meet the Twin Sisters
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              We are two Parisian twins with an unshakable love for travel. Over
              the years, we've ventured to places like Algiers, Strasbourg,
              Normandy, London, Milan, Rome, New York, Istanbul, Dubai, and
              Brussels. But no matter where we go, Paris will always be our
              home.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              With a deep knowledge of every little secret this beautiful city
              has to offer, we've made it our mission to share these secrets
              with the world. From hidden gems in Paris to our adventures
              abroad, our Instagram and blog are our way of connecting with
              like-minded wanderlust souls.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Join us as we explore the world and dive deep into the heart of
              Paris, offering you the ultimate travel guides and insider tips
              for an unforgettable journey.
            </p>
            <Link
              href="https://www.instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center p-2 bg-orange-900 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-orange-950 transition-all duration-300"
              >
              <FaInstagramSquare className="mr-3 text-2xl" />
              Follow Us on Instagram
            </Link>
          </div>

          {/* Photo of Twins */}
          <div className="flex-1">
            <Image
              src="/twins.png"
              alt="Twin Sisters"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Our Travel Adventures */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-orange-950 text-center mb-8">
            Our Travel Adventures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((adventure) => (
              <div
                key={adventure.city}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={`/travel/${adventure.city.replace(" ", "")}.jpg`}
                  alt={adventure.city}
                  width={400}
                  height={250}
                  className="object-cover w-full h-64"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-orange-950 mb-2">
                    {adventure.title}
                  </h3>
                  <p className="text-gray-700">{adventure.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why We Started */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-orange-950 text-center mb-8">
            Why We Started Sharing Our Story
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
            As twin sisters, we've always had a shared passion for exploring the
            world. But what really ignited our journey was our love for Paris
            and the desire to share everything we know about it. Paris isn't
            just about visiting iconic monuments – it's about discovering the
            hidden gems, the secret spots only locals know, and the unique
            stories that make this city so magical.
          </p>
          <p className="text-lg text-gray-700 text-center mt-4 max-w-4xl mx-auto">
            We created this blog and Instagram page as a way to connect with
            fellow travelers, share tips, and document our personal adventures.
            Through our guides and posts, we want to inspire you to go beyond
            the usual touristy experiences and truly immerse yourself in the
            culture, beauty, and history of Paris.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            href="/content/guide"
            className="px-6 py-3 bg-orange-950 text-white font-semibold rounded-lg hover:bg-orange-900 transition"
          >
            Discover Our Travel Guides
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
