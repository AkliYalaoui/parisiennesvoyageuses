import Link from "next/link";

const Hero = () => {
  return (
    <header className="relative h-screen">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-50"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative top-1/2 transform -translate-y-1/2">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-white font-bold max-w-4xl leading-tight">
          Your Next Adventure Starts Here
        </h1>
        <h4 className="text-sm sm:text-base lg:text-lg text-white max-w-xl mt-4">
          Follow us as we capture the magic of travel and uncover the secrets of the world's most enchanting destinations.
        </h4>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="rounded p-2 bg-orange-950 text-white text-center"
          >
            Follow Us on Instagram
          </Link>
          <Link
            href="/content/guide"
            className="rounded p-2 border border-orange-950 text-orange-950 bg-slate-50 text-center"
          >
            Shop Our Travel Guide
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Hero;