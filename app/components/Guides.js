import Link from "next/link";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { FaMapSigns } from "react-icons/fa";

const Guides = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange-900 mb-6">
            Discover the Magic of Paris
          </h2>
          <p className="text-xl text-gray-700">
            Your ultimate guide to the City of Light. Explore iconic landmarks,
            savor local cuisine, and immerse yourself in Parisian culture.
          </p>
        </div>

        {/* Icon Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <IoFastFoodOutline className="text-6xl text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Savor Paris</h3>
            <p className="text-gray-600">
              Indulge in the best croissants, bakeries, and world-class coffees.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <MdOutlinePlace className="text-6xl text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Iconic Landmarks
            </h3>
            <p className="text-gray-600">
              Discover the Eiffel Tower, Notre-Dame, and charming streets of
              Paris.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <FaMapSigns className="text-6xl text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Plan Your Day
            </h3>
            <p className="text-gray-600">
              Follow our guide for a perfect day in Paris filled with adventure.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link
            href="/content/guide"
            className="px-8 py-4 bg-orange-700 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-orange-900 transition-all duration-300"
          >
            Get Your Paris Guide Now
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            *Limited-time offer: Plan your trip today and get exclusive insights!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Guides;
