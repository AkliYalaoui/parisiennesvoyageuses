import { createClient } from "@/app/config/supabaseServerClient";
import { login } from "@/app/lib/loginAdmin";
import { redirect } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default async function LoginPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/admin/dashboard");
  }
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Admin Login
        </h1>
        <form className="space-y-6" action={login}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaLock />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:amber-blue-500"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-amber-800 text-white font-medium py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Log in
          </button>
        </form>
      </div>
    </section>
  );
}
