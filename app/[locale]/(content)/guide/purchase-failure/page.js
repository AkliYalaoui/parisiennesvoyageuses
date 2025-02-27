import { Link } from "@/i18n/routing";
import { FiAlertCircle } from "react-icons/fi";

export default function GuidePurchaseFailurePage() {
  return (
    <div className="md:pt-16 flex flex-col items-center justify-center px-6">
      <div className="bg-peach shadow-lg rounded-xl p-8 max-w-lg text-center">
        <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong with your purchase. Please check your payment details and try again.
        </p>
        <p className="text-gray-600 mb-6">
          If you believe this is a technical issue, feel free to contact us for assistance.
        </p>
        <div className="space-x-4">
          <Link
            href="/guide"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium  p-2 rounded-lg transition duration-200"
          >
            Try Again
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium  p-2 rounded-lg transition duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
