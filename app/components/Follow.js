import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FiCamera, FiHeart } from "react-icons/fi";

const Follow = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-pink-50 to-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
      {/* Header */}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange-900 mb-4">
        Join Us on Instagram
      </h2>
      <p className="text-lg text-gray-700 mb-10">
        Experience the world through our lens! Follow us as we share stunning
        travel photos, behind-the-scenes moments, and unforgettable stories.
      </p>

      {/* Icon Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FiCamera className="text-6xl text-orange-900 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Travel Photos</h3>
          <p className="text-gray-600">
            Get inspired by breathtaking shots of iconic places and hidden gems.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FiHeart className="text-6xl text-orange-900 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Moments of Joy</h3>
          <p className="text-gray-600">
            Discover heartwarming stories and moments that make our trips special.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FaInstagram className="text-6xl text-orange-900 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Live Updates</h3>
          <p className="text-gray-600">
            Follow our journey in real time and stay connected to our adventures.
          </p>
        </div>
      </div>

      {/* Call-to-Action */}
      <div>
        <Link
          href="https://www.instagram.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-orange-900 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-orange-950 transition-all duration-300"
        >
          <FaInstagram className="mr-3 text-2xl" />
          Follow Us on Instagram
        </Link>
      </div>
    </div>
  </section>
  )
}

export default Follow