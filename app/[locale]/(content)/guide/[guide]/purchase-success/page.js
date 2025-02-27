import Image from "next/image";
import { guideDetails } from "@/app/data/guide";
import { Link } from "@/i18n/routing";
import { FiCheckCircle } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

export default async function GuidePurchaseSuccessPage({ params }) {
  const { guide } = await params;
  const guidedetails = guideDetails[guide];

  if (!guidedetails) return null;

  return (
    <div className="flex items-center justify-center  px-4 md:pt-16">
      <div className="bg-peach shadow-md rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center gap-4 border-b pb-4">
          <FiCheckCircle className="w-10 h-10 text-green-500 flex-shrink-0" />
          <div>
            <h1 className="text-2xl font-bold text-coffee">
              Purchase Successful
            </h1>
            <p className="text-warmbrown text-sm">
              Thank you for purchasing{" "}
              <span className="font-medium">{guidedetails.title}</span>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="relative w-28 h-28 flex-shrink-0">
            <Image
              src={guidedetails.imageUrl}
              alt={guidedetails.title}
              fill
              className="object-cover rounded-lg shadow-sm"
            />
          </div>
          <p className="text-gray-700 text-sm leading-relaxed flex-grow">
            {guidedetails.description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-coffee mt-4">
          <MdEmail className="text-gray-500 text-xl" />
          <span>Your guide has been sent to your email.</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link
            href="/guide"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
          >
            Browse More Guides
          </Link>
          <p className="text-gray-600 text-sm">
            Price: <span className="font-semibold">€{guidedetails.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
